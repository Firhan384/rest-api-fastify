import { FastifyLoggerOptions } from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger";
import { AppConfig } from "./app.config";

type tLoggerConfig = {
  development: FastifyLoggerOptions & PinoLoggerOptions;
  production: FastifyLoggerOptions & PinoLoggerOptions;
};

/**
 * setup config logging
 */
export const LoggerConfig: tLoggerConfig = {
  development: {
    transport: {
      targets: [
        {
          level: "trace",
          target: "pino/file",
          options: {
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname",
            destination: `logs/${AppConfig.LOG_NAME}`,
            mkdir: true
          },
        },
      ],
    },
  },
  production: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
};
