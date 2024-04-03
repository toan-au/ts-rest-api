import mongoose from "mongoose";
import logger from "./logger";
import config from "config";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    const response = await mongoose.connect(dbUri);
    logger.info("Connnected to DB");
    return response;
  } catch (error) {
    logger.error("Unable to connect to the DB");
    process.exit(1);
  }
}

export default connect;
