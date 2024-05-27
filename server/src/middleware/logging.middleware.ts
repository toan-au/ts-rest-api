import { NextFunction, Request, Response } from "express";

export default function loggingMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const now = new Date().toISOString();
  const userAgent = req.headers["user-agent"] || "unknown";

  console.log(
    `${now} - ${req.method} ${req.originalUrl} - User Agent: ${userAgent}`
  );

  next();
}
