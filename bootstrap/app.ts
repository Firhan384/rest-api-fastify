import Fastify, { FastifyInstance } from "fastify";

export default class BootstrapApp {
  private static instance: FastifyInstance;

  private constructor() {}

  static getInstance(): FastifyInstance {
    if (!BootstrapApp.instance) {
        BootstrapApp.instance = Fastify();
    }
    return BootstrapApp.instance;
  }
}
