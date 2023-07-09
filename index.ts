import "reflect-metadata";
import "dotenv/config";
import { bootstrap } from "fastify-decorators";
import { FastifyInstance } from "fastify";
import UserController from "./app/modules/user/user.controller";
import BootstrapApp from "./bootstrap/app";
import { connectDB } from "./app/database/connection";
import { AppConfig } from "./app/configs/app.config";
import jwt from "@fastify/jwt";
import { printBanner } from "./app/utils/banner.util";
import rateLimit from '@fastify/rate-limit';


const main = async () => {
  const app: FastifyInstance = BootstrapApp.getInstance();

  // banner
  printBanner();

  // connecting with database
  await connectDB();

  // error handler
  app.setErrorHandler(function (error, request, reply) {
    if (error.validation) {
      reply.status(400).send({
        statusCode: error.statusCode,
        error: true,
        message: error.validation.map(
          (err) => `${err.instancePath} ${err.message}`
        ),
      });
    }

    // for handle error rate limit
    if (error.statusCode === 429) {
      reply.status(429).send({
        statusCode: error.statusCode,
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
  app.register(bootstrap, {
    controllers: [UserController],
  });

  // run the server
  app.listen({ port: AppConfig.APP_PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
    console.log(`Available routes: \n${app.printRoutes()}`);
  });
};

main();
