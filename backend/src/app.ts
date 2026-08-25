// src/app.ts
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import express from 'express';

import { buildSchema } from 'type-graphql';

import { AuthResolver } from '@/resolvers/auth.resolver';
import { UserResolver } from '@/resolvers/user.resolver';

import { expressMiddleware } from '@as-integrations/express5';

export async function createApp() {
  const app = express();

  app.use(cors({ origin: '*', credentials: true }));

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver],
    validate: false,
    emitSchemaFile: './schema.graphql'
  });

  const server = new ApolloServer({ schema });
  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  return app;
}
