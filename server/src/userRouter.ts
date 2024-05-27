// -- userRouter.js --
import { Router } from "express";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./controllers/user.controller";

const userRouter = Router();

userRouter.post("/", validateResource(createUserSchema), createUserHandler);

export default userRouter;
