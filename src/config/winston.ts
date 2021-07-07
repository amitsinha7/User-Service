import * as winston from "winston";
const rTracer = require("cls-rtracer");

// a custom format that outputs request id
const rTracerFormat = winston.format.printf(info => {
  const rid = rTracer.id();
  return rid ? `${info.timestamp} [request-id:  ${rid}]: ${info.message}` : `${info.timestamp}: ${info.message}`;
});

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json(), rTracerFormat),
  transports: [new winston.transports.Console()]
});

export default logger;
