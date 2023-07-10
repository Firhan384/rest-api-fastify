import { Inject, FastifyRequestToken, FastifyReplyToken, Service } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import responseHelper from '../../helpers/response.helper';
import { UserRepository } from './user.repository';

@Service()
export class UserService {
  @Inject(FastifyRequestToken)
  request!: FastifyRequest;

  @Inject(FastifyReplyToken)
  reply!: FastifyReply;

  @Inject(responseHelper)
  resHelper!: responseHelper;

  @Inject(UserRepository)
  userRepo!: UserRepository;

  public async getUsers(): Promise<FastifyReply> {
    const data = await this.userRepo.getAll();
    return this.resHelper.ok(data, "Successfully to get data users");
  }
}