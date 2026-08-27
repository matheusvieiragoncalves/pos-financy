import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import express from 'express';

import { buildSchema } from 'type-graphql';

import { expressMiddleware } from '@as-integrations/express5';
import { AuthResolver } from './resolvers/auth/auth.resolver';
import { UserResolver } from './resolvers/user/user.resolver';

export async function createApp() {
  const app = express();

  app.use(cors({ origin: '*', credentials: true }));

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver],
    validate: false,
    emitSchemaFile: './schema.graphql'
  });

  const server = new ApolloServer({
    schema,
    formatError: (formattedError, error) => {
      // console.error('[GraphQL Error]', error);

      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'test'
      ) {
        return {
          message: formattedError.message,
          extensions: {
            code: formattedError.extensions?.code ?? 'INTERNAL_SERVER_ERROR'
          }
        };
      }

      return formattedError;
    }
  });
  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  return app;
}
