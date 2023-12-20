import { format, createLogger, transports } from "winston";
const { printf, combine, timestamp, errors, colorize, json } = format;

const customFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

function prodLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
}

function devLogger() {
  return createLogger({
    format: combine(
      colorize({ level: true }),
      timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
      errors({ stack: true }),
      customFormat
    ),
    transports: [new transports.Console()],
  });
}

let logger = prodLogger();
if (process.env.NODE_ENV === "dev") logger = devLogger();

export default logger;
