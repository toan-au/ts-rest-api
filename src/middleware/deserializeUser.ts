import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../services/session.service";
import logger from "../utils/logger";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();
  const { expired, decoded } = verifyJwt(accessToken);

  if (!expired && decoded) res.locals.user = decoded;

  if (expired && refreshToken) {
    const newToken = await reIssueAccessToken(refreshToken as string);
    if (newToken) {
      res.setHeader("x-access-token", newToken);

      const result = verifyJwt(newToken);
      res.locals.user = result.decoded;
    }
  }

  return next();
};
