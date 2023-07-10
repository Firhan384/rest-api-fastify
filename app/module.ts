// the module has function as a wrapper controllers
import { Constructor } from "fastify-decorators/decorators/helpers/inject-dependencies";
import UserController from "./modules/user/user.controller";

export const controllersModule: { controllers: Constructor<unknown>[] } = {
  controllers: [UserController],
};
