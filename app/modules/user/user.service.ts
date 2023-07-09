import { Inject, FastifyRequestToken, FastifyReplyToken, Service } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import responseHelper from '../../helpers/response.helper';

@Service()
export class UserService {
  @Inject(FastifyRequestToken)
  request!: FastifyRequest;

  @Inject(FastifyReplyToken)
  reply!: FastifyReply;

  @Inject(responseHelper)
  resHelper!: responseHelper;

  public replyWithHttp(): FastifyReply {
    return this.resHelper.ok(null, "oke bgt");
  }
}