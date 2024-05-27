import { Express, Request, Response } from "express";
import userRouter from "./userRouter"; // Import your modularized routers
import productRouter from "./productRouter";
import sessionRouter from "./sessionRouter";
import loggingMiddleware from "./middleware/logging.middleware"; // Import the middleware

function routes(app: Express) {
  app.get("/healthcheck", (_req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  app.use("/api/users", loggingMiddleware, userRouter);
  app.use("/api/sessions", loggingMiddleware, sessionRouter);
  app.use("/api/products", productRouter);
}

export default routes;
