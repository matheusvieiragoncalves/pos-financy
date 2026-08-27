import { createParameterDecorator, ResolverData } from 'type-graphql';
import { prismaClient } from '../../../prisma/prisma.ts';
import { User } from '../../generated/prisma/client.ts';
import { TGraphQLContext } from '../context/index.ts';

export const GqlUser = () => {
  return createParameterDecorator(
    async ({
      context
    }: ResolverData<TGraphQLContext>): Promise<User | null> => {
      if (!context || !context.user) return null;

      try {
        const user = await prismaClient.user.findUnique({
          where: {
            id: context.user
          }
        });

        if (!user) throw new Error('User not found');

        return user;
      } catch (error) {
        console.log('Error fetching user in GqlUser decorator:', error);
        return null;
      }
    }
  );
};
