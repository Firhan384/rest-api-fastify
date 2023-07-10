import { Controller, GET, Inject, POST } from "fastify-decorators";
import { UserService } from "./user.service";
import { JwtMiddleware } from "../../middlewares/jwt.middleware";
import { FastifyReply, FastifyRequest } from "fastify";
import { schema, schemaCompile } from "./schemas/user-create.schema";

@Controller({ route: "/user" })
export default class UserController {
  @Inject(UserService)
  private userService!: UserService;

  @POST({
    url: "/save",
    options: {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: "30 seconds",
        },
      },
      validatorCompiler: () => {
        return schemaCompile;
      },
      schema: {
        body: schema,
      },
    },
  })
  async helloHandler(request: FastifyRequest, reply: FastifyReply) {
    const token = await reply.jwtSign({ foo: "bar" });
    return reply.code(200).send({
      token,
    });
  }

  @GET({
    url: "/list",
  })
  async list() {
    return await this.userService.getUsers();
  }
}
