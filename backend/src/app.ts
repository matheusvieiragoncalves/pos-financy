import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import express from 'express';

import { buildSchema } from 'type-graphql';

import { unwrapResolverError } from '@apollo/server/errors';
import { expressMiddleware } from '@as-integrations/express5';
import { AppError } from './errors/app-error';
import { buildContext } from './graphql/context';
import { AuthResolver } from './resolvers/auth/auth.resolver';
import { CategoryResolver } from './resolvers/category/category.resolver';
import { TransactionResolver } from './resolvers/transaction/transaction.resolver';
import { UserResolver } from './resolvers/user/user.resolver';

export async function createApp() {
  const app = express();

  app.use(cors({ origin: '*', credentials: true }));

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      CategoryResolver,
      TransactionResolver
    ],
    emitSchemaFile: './schema.graphql',
    validate: true
  });

  const server = new ApolloServer({
    schema,
    formatError: (formattedError, error) => {
      const originalError = unwrapResolverError(error);

      // console.error('[GraphQL Error]', originalError);

      const isAppError = originalError instanceof AppError;

      const isProd = process.env.NODE_ENV === 'production';

      if (!isAppError) {
        return {
          message: 'Erro interno do servidor',
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 }
          }
        };
      }

      if (isProd) {
        return {
          message: formattedError.message,
          extensions: {
            code: formattedError.extensions?.code,
            http: formattedError.extensions?.http
          }
        };
      }

      return formattedError;
    }
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext
    })
  );

  return app;
}
