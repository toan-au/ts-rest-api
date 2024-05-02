import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import routes from "../routes";
import cors from "cors";
import config from "config";

function createServer() {
  const app = express();

  app.use(cors({
    origin: config.get("origin"),
    credentials: true
  }))
  app.use(express.json());
  app.use(deserializeUser);
  routes(app);

  return app;
}

export default createServer;
