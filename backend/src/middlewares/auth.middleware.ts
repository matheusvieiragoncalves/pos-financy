import { UnauthorizedError } from '@/errors/unauthorized-error';
import { TGraphQLContext } from '@/graphql/context';
import { MiddlewareFn } from 'type-graphql';

export const isAuthenticated: MiddlewareFn<TGraphQLContext> = async (
  { context },
  next
) => {
  if (!context.userId) throw new UnauthorizedError();
  return next();
};
