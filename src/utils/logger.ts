import pino from "pino";
import stream from "pino-pretty";
import dayjs from "dayjs";

const pretty = stream({ levelFirst: true, colorize: true });

const logger = pino(
  {
    base: {
      pid: false,
    },
  },
  pretty
);

export default logger;
