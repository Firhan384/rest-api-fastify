import { Controller, GET, Inject, POST } from "fastify-decorators";
import { UserService } from "./user.service";
import { JwtMiddleware } from "../../middlewares/jwt.middleware";
import { FastifyReply, FastifyRequest } from "fastify";
import { schema, schemaCompile } from "./schemas/user-create.schema";
import { sendEmail } from "../../utils/email.util";

@Controller({ route: "/user" })
export default class UserController {
  @Inject(UserService)
  private userService!: UserService;

  @GET({
    url: "/list",
    options: {
      onRequest: [JwtMiddleware]
    }
  })
  async list() {
    return await this.userService.getUsers();
  }
}
