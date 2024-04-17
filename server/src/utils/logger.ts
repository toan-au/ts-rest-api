import pino from "pino";
import stream from "pino-pretty";
import config from "config";

const pretty = stream({ levelFirst: true, colorize: true });

const logger = pino(
  {
    base: {
      pid: false,
    },
    level: "trace",
  },
  pretty
);

export default logger;
