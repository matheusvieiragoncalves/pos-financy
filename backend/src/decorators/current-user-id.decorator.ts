import { TGraphQLContext } from '@/graphql/context';
import { createParameterDecorator } from 'type-graphql';

export function CurrentUserId() {
  return createParameterDecorator<TGraphQLContext>(({ context }) => {
    return context.userId;
  });
}
