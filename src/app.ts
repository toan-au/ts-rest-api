import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";

const port = config.get<number>("port");
const app = express();

app.use(express.json());
app.use(deserializeUser);
routes(app);

app.listen(port, async () => {
  logger.info(`This app is running at http://localhost:${port}`);
  await connect();
});
