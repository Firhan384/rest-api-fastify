import { FastifyReply, FastifyRequest } from "fastify";

export const JwtMiddleware = async (
  requst: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await requst.jwtVerify();
  } catch (error: any) {
    reply.code(401).send({
      statusCode: 401,
      error: true,
      data: null,
      message: error?.message,
    });
  }
};
