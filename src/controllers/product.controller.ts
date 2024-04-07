import { removeListener } from "process";
import ProductModel from "../models/product.model";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../services/product.service";
import logger from "../utils/logger";
import {
  CreateProductInput,
  DeleteProductInput,
  FindProductInput,
  UpdateProductInput,
} from "./../schema/product.schema";
import { Request, Response } from "express";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;
  logger.trace(body);

  try {
    logger.trace("creating product...");
    const product = await createProduct({ ...body, user: userId });
    logger.trace(`product created ${product}`);
    return res.send(product);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send("Could not create product");
  }
}

export async function findProductHandler(
  req: Request<FindProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);
  if (product.user != userId) return res.sendStatus(403);

  return res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);
  if (product.user != userId) return res.sendStatus(403);

  const updatedProduct = await findAndUpdateProduct({ productId }, update);

  return res.send(updatedProduct);
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);
  if (product.user != userId) return res.sendStatus(403);

  const result = await deleteProduct({ productId });

  if (!result.acknowledged) return res.sendStatus(400);
  return res.sendStatus(200);
}
