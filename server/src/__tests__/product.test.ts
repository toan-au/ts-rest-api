import supertest from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt";

const userPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  email: "jane.doe@example.com",
  name: "Jane Doe",
};
const productPayload = {
  user: userPayload._id,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};
const app = createServer();

describe("product", () => {
  describe("get product", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const productId = "NOT_A_REAL_PRODUCT_ID";
        const { statusCode } = await supertest(app).get(
          `/api/products/${productId}`
        );
        expect(statusCode).toBe(404);
      });
    });

    // describe("Given the user is not logged in", () => {
    //   it("should return a 403", async () => {
    //     const productId = "NOT_A_REAL_PRODUCT_ID";
    //     const { statusCode } = await supertest(app).get(
    //       `/api/products/${productId}`
    //     );
    //     expect(statusCode).toBe(403);
    //   });
    // });
  });
  describe("create product", () => {
    describe("Given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post(`/api/products/`);
        expect(statusCode).toBe(403);
      });
    });
    describe.skip("Given the user is logged in", () => {
      it("should return 200 and create a product", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/products")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(200);
        expect(body).toEqual({});
      });
    });
  });
});
