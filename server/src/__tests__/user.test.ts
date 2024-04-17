import mongoose from "mongoose";
import supertest from "supertest";
import * as UserService from "../services/user.service";
import * as SessionService from "../services/session.service";
import createServer from "../utils/server";
import { createSessionHandler } from "../controllers/session.controller";

const userPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

const registrationPayload = {
  email: "jane.doe@example.com",
  name: "Jane Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userPayload._id,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

const app = createServer();

describe("user", () => {
  describe("user registration", () => {
    describe("give the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);
        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(registrationPayload);

        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(registrationPayload);
      });
    });
    describe("given the password do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);
        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send({ ...registrationPayload, passwordConfirmation: "noMatch" });

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });
    describe("Given the user service throws", () => {
      it("Should return a 409", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockRejectedValue("oh no!");
        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send(registrationPayload);

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalledWith(registrationPayload);
      });
    });
  });
  describe("Create user session", () => {
    describe("Given the username and password are valid", () => {
      it("Should return a signed accessToken and refreshToken", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValue(userPayload);

        const createSessionServiceMock = jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => "a user agent",
          body: {
            email: "jane.doe@example.com",
            password: "Password123",
          },
        };

        const res = {
          send: jest.fn(),
        };

        // @ts-ignore
        await createSessionHandler(req, res);

        expect(res.send).toHaveBeenLastCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
