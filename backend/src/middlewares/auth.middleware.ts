import { isPublicField } from '@/decorators/public.decorator';
import { UnauthorizedError } from '@/errors/unauthorized-error';
import { TGraphQLContext } from '@/graphql/context';
import { MiddlewareFn } from 'type-graphql';

export const isAuthenticated: MiddlewareFn<TGraphQLContext> = async (
  { context, info },
  next
) => {
  if (isPublicField(info.fieldName)) return next(); // Decorator personalizado tornar uma query/mutation pública - src/decorators/public.decorator.ts

  if (!context.userId) throw new UnauthorizedError();
  return next();
};
