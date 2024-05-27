// -- productRouter.js --
import { Router } from "express";
import {
  findProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controllers/product.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  findProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "./schema/product.schema";

const productRouter = Router();

productRouter.get(
  "/:productId",
  [requireUser, validateResource(findProductSchema)],
  findProductHandler
);
productRouter.post(
  "/",
  [requireUser, validateResource(createProductSchema)],
  createProductHandler
);
productRouter.put(
  "/:productId",
  [requireUser, validateResource(updateProductSchema)],
  updateProductHandler
);
productRouter.delete(
  "/:productId",
  [requireUser, validateResource(deleteProductSchema)],
  deleteProductHandler
);

export default productRouter;
