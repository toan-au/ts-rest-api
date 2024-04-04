import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  if (!accessToken) return next();

  const { expired, decoded } = verifyJwt(accessToken);
  if (decoded) res.locals.user = decoded;

  return next();
};
