import { FastifyReply } from "fastify";
import { FastifyReplyToken, Inject, Service as Helper } from "fastify-decorators";


@Helper()
export default class responseHelper {
  @Inject(FastifyReplyToken)
  res!: FastifyReply;

  /**
   * response with status 200
   * @param data any
   * @param message string
   * @returns
   */
  public ok<T>(data: T, message: string): FastifyReply {
    return this.res.code(200).send({
      statusCode: 200,
      error: false,
      data,
      message,
    });
  }

  /**
   * response with status 201
   * @param data any
   * @param message string
   * @returns
   */
  public created<T>(data: T, message: string): FastifyReply {
    return this.res.code(201).send({
      statusCode: 201,
      error: false,
      data,
      message,
    });
  }

  /**
   * response with status 404
   * @param data any
   * @param message string
   * @returns
   */
  public notFound<T>(data: T, message: string): FastifyReply {
    return this.res.code(404).send({
      statusCode: 404,
      error: true,
      data,
      message,
    });
  }

  /**
   * response with status 400
   * @param data any
   * @param message string
   * @returns
   */
  public badRequest<T>(data: T, message: string): FastifyReply {
    return this.res.code(400).send({
      statusCode: 400,
      error: true,
      data,
      message,
    });
  }

  /**
   * response with status 422
   * @param data any
   * @param message string
   * @returns
   */
  public unprocessableEntity<T>(data: T, message: string): FastifyReply {
    return this.res.code(422).send({
      statusCode: 422,
      error: true,
      data,
      message,
    });
  }

  /**
   * response with status 500
   * @param data any
   * @param message string
   * @returns
   */
  public internalServer<T>(data: T, message: string): FastifyReply {
    return this.res.code(500).send({
      statusCode: 500,
      error: true,
      data,
      message,
    });
  }
}
