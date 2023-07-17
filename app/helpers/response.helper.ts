import { FastifyReply } from "fastify";
import {
  FastifyReplyToken,
  Inject,
  Service as Helper,
} from "fastify-decorators";
import { HttpStatusCode } from "../utils/http-status.util";

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
    return this.res.code(HttpStatusCode.OK).send({
      statusCode: HttpStatusCode.OK,
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
    return this.res.code(HttpStatusCode.Created).send({
      statusCode: HttpStatusCode.Created,
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
    return this.res.code(HttpStatusCode.NotFound).send({
      statusCode: HttpStatusCode.NotFound,
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
    return this.res.code(HttpStatusCode.BadRequest).send({
      statusCode: HttpStatusCode.BadRequest,
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
    return this.res.code(HttpStatusCode.UnprocessableEntity).send({
      statusCode: HttpStatusCode.UnprocessableEntity,
      error: true,
      data,
      message,
    });
  }

  /**
   * response with status 403
   * @param data any
   * @param message string
   * @returns
   */
  public forbidden<T>(data: T, message: string): FastifyReply {
    return this.res.code(HttpStatusCode.Forbidden).send({
      statusCode: HttpStatusCode.Forbidden,
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
    return this.res.code(HttpStatusCode.InternalServerError).send({
      statusCode: HttpStatusCode.InternalServerError,
      error: true,
      data,
      message,
    });
  }
}
