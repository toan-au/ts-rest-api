import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import cors from "cors";

const port = config.get<number>("port");

const app = createServer();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.listen(port, async () => {
  logger.info(`This app is running at http://localhost:${port}`);
  await connect();
});
