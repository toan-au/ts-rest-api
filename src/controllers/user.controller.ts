import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    const response = omit(user.toJSON(), "password");
    return res.send(response);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
