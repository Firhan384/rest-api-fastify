import { Inject, FastifyReplyToken, Service } from "fastify-decorators";
import { FastifyReply, FastifyRequest } from "fastify";
import responseHelper from "../../helpers/response.helper";
import { UserRepository } from "../user/user.repository";
import { loginBody } from "./schemas/login.schema";
import { compareHashText } from "../../utils/hash.util";

@Service()
export class AuthService {
  @Inject(FastifyReplyToken)
  reply!: FastifyReply;

  @Inject(responseHelper)
  resHelper!: responseHelper;

  @Inject(UserRepository)
  userRepo!: UserRepository;

  public async login(
    request: FastifyRequest<{ Body: loginBody }>
  ): Promise<FastifyReply> {
    const user = await this.userRepo.getByEmail(request.body.email);

    if (!user) {
      return this.resHelper.notFound(null, "email not found");
    }

    if (!compareHashText(request.body.password, user.password)) {
      return this.resHelper.forbidden(null, "password not match");
    }

    const body = {
      email: user.email,
      token: await this.reply.jwtSign({ userId: user.id }),
    };

    return this.resHelper.ok(body, "Successfully to get data users");
  }
}
