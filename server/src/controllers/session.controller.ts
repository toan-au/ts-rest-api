import { createSessionInput } from "./../schema/session.schema";
import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { signJwt } from "../utils/jwt";
import config from "config";
import { UserDocument } from "../models/user.model";

export async function createSessionHandler(
  req: Request<{}, {}, createSessionInput["body"]>,
  res: Response
) {
  // validate
  const { email, password } = req.body;
  const user = await validatePassword(email, password);
  if (!user) return res.status(401).send("Invalid email or password");

  // create session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create tokens
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );

  return res.send({ accessToken, refreshToken });
}

export async function getSessionsHandler(req: Request, res: Response) {
  const user: UserDocument = res.locals.user;
  const sessions = await findSessions({ user: user._id, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const session = res.locals.user.session;

  await updateSession({ _id: session }, { valid: false });

  return res.send({ accessToken: null, refreshToken: null });
}
