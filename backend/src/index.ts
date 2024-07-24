import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import http from 'http';
import cors from 'cors';
import db from './db';
import { ContextType, Payload } from './types/index';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import { verify } from 'jsonwebtoken';
import getSchema from './lib/schema';
import UserService from './services/User/user.service';

const port = Number(process.env.SERVER_PORT) || 4000;

async function main() {
  try {
    // Initialisation des schema via les resolvers puis de la database
    const schema = await getSchema;
    await db.initialize();

    // Creation du server http express/ApolloServer
    const app = express();
    const httpServer = http.createServer(app);
    const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
    const server = new ApolloServer({ schema, plugins });
    await server.start();

    // Express app setup
    app.use(
      cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      }),
    );
    const context = async (ctx: ContextType) => {
      const token = ctx.req.headers.cookie?.split('token=')[1];
      try {
        if (token) {
          const payload = verify(token, process.env.JWT_PRIVATE_KEY as string) as Payload;

          if (payload.userId) {
            const currentUser = await new UserService().findUserById(payload.userId);
            ctx.currentUser = currentUser;
            return ctx;
          }
        }
      } catch (error) {
        console.log(error);
      }
      return ctx;
    };
    const middleware = expressMiddleware(server, { context });
    app.use(express.json(), middleware);
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }
}

main();
