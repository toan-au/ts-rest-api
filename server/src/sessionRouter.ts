// -- sessionRouter.js --
import { Router } from "express";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import {
  createSessionHandler,
  getSessionsHandler,
  deleteSessionHandler,
} from "./controllers/session.controller";
import requireUser from "./middleware/requireUser";

const sessionRouter = Router();

sessionRouter.post(
  "/",
  validateResource(createSessionSchema),
  createSessionHandler
);
sessionRouter.get("/", requireUser, getSessionsHandler);
sessionRouter.delete("/", requireUser, deleteSessionHandler);

export default sessionRouter;
