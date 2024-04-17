import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionsHandler,
} from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {
  createProductSchema,
  deleteProductSchema,
  findProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  findProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createSessionHandler
  );

  app.get("/api/sessions", requireUser, getSessionsHandler);

  app.delete("/api/session", requireUser, deleteSessionHandler);

  app.get(
    "/api/product/:productId",
    [requireUser, validateResource(findProductSchema)],
    findProductHandler
  );

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.delete(
    "/api/product/:productId",
    validateResource(deleteProductSchema),
    deleteProductHandler
  );
}

export default routes;
