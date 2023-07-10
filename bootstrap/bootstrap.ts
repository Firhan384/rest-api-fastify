import jwt from "@fastify/jwt";
import App from "../app/app";
import { connectDB } from "../app/database/connection";
import { printBanner } from "../app/utils/banner.util";
import { AppConfig } from "../app/configs/app.config";
import rateLimit from '@fastify/rate-limit';
import { bootstrap } from "fastify-decorators";
import { controllersModule } from "../app/module";
import { HttpStatusCode } from "../app/utils/http-status.util";

/**
 * all the features wrap here
 */
export const bootstrapApp = async () => {
  const app = new App().createInstance();

  // banner
  printBanner();

  // connecting with database
  await connectDB();

  // error handler
  app.setErrorHandler(function (error, request, reply) {
    if (error.validation) {
      reply.status(HttpStatusCode.BadRequest).send({
        statusCode: HttpStatusCode.BadRequest,
        error: true,
        message: error.validation.map(
          (err) => `${err.instancePath} ${err.message}`
        ),
      });
    }

    // for handle error rate limit
    if (error.statusCode === HttpStatusCode.TooManyRequests) {
      reply.status(HttpStatusCode.TooManyRequests).send({
        statusCode: error.statusCode,
        error: true,
        message: error.message,
      });
    }

    // handle for internal server
    if (error.statusCode === HttpStatusCode.InternalServerError) {
      reply.status(HttpStatusCode.InternalServerError).send({
        statusCode: HttpStatusCode.InternalServerError,
        error: true,
        message: error.message,
      });
    }
  });

  // register rate limit
  app.register(rateLimit);

  // register jwt
  app.register(jwt, { secret: AppConfig.JWT_SECRET });

  // register controller
  app.register(bootstrap, controllersModule);

  // run the server
  app.listen({ port: AppConfig.APP_PORT }, (err, address) => {
    if (err) {
      app.log.trace(err);
      process.exit(1);
    }
    console.info(`Server listening at ${address}`);
    console.info(`Available routes: \n${app.printRoutes()}`);
  });
};
