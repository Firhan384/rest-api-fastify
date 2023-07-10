import Fastify, { FastifyInstance } from "fastify";
import { AppConfig } from "./configs/app.config";
import { LoggerConfig } from "./configs/logger.config";

export default class App {
  // create instance & setup logger
  public createInstance(): FastifyInstance {
    const app: FastifyInstance = Fastify({
      logger: LoggerConfig[AppConfig.APP_MODE],
    });

    return app;
  }
}
