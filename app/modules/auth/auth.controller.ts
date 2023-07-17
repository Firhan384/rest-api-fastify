import { Controller, Inject, POST } from "fastify-decorators";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  loginBody,
  loginSchema,
  loginSchemaCompile,
} from "./schemas/login.schema";
import { AuthService } from "./auth.service";

@Controller({ route: "/auth" })
export default class AuthController {
  @Inject(AuthService)
  private authService!: AuthService;

  @POST({
    url: "/login",
    options: {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: "30 seconds",
        },
      },
      validatorCompiler: () => {
        return loginSchemaCompile;
      },
      schema: {
        body: loginSchema,
      },
    },
  })
  public async login(
    request: FastifyRequest<{ Body: loginBody }>,
    reply: FastifyReply
  ) {
    return await this.authService.login(request);
  }
}
