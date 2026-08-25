import cors from 'cors';
import express from 'express';

import 'dotenv/config'; // Responsible for loading environment variables from a .env file into process.env
import 'reflect-metadata'; // Responsible for enabling decorators in TypeScript

import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';

import { AuthResolver } from '@/resolvers/auth.resolver.ts';
import { expressMiddleware } from '@as-integrations/express5';
import { UserResolver } from './resolvers/user.resolver.ts';

async function startServer() {
  const app = express();

  app.use(
    cors({
      origin: '*',
      credentials: true
    })
  );

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver],
    validate: false,
    emitSchemaFile: './schema.graphql'
  });

  const server = new ApolloServer({
    schema
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
