import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    password: string({ required_error: "password is required" }).min(
      6,
      "Password too short - should be 6 characters minimum"
    ),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
