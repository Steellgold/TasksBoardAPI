import { FastifyReply, FastifyRequest } from "fastify";
import { RouteOptions } from "fastify/types/route";
import { app } from "..";
import prisma, { patch } from "../utils/prisma";
import { checkEnvKey } from "../utils/Validator";

type Params = {
  userIdentifier: string;
  secretKey: string;
}

/** GET ALL TASKS OF WEBSITE */
app.route({
  method: "GET",
  url: "/tasks/all/:secretKey",
  handler: async(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    checkEnvKey(request.params.secretKey, reply);

    const tasks = await prisma.tasks.findMany();
    reply.send(patch(tasks));
  }
} as RouteOptions);

/** GET ALL TASKS OF A USER */
app.route({
  method: "GET",
  url: "/tasks/:userIdentifier/:secretKey",
  handler: async(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    checkEnvKey(request.params.secretKey, reply);

    const tasks = await prisma.tasks.findMany({
      where: {
        taskAuthor: String(request.params.userIdentifier)
      }
    });

    reply.send(patch(tasks));
  }
} as RouteOptions);