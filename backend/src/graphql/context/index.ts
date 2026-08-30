import { JwtService } from '@/services/jwt/jwt.service';
import { ExpressContextFunctionArgument } from '@as-integrations/express5';
import { prismaClient } from '../../../prisma/prisma';

export type TGraphQLContext = {
  userId?: string;
  token?: string;
  req: ExpressContextFunctionArgument['req'];
  res: ExpressContextFunctionArgument['res'];
};

const jwtService = new JwtService();

const buildContext = async ({
  req,
  res
}: ExpressContextFunctionArgument): Promise<TGraphQLContext> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : undefined;

  if (!token) return { req, res };

  const payload = jwtService.verify(token);

  if (!payload) return { req, res };

  const userExists = await prismaClient.user.findUnique({
    where: { id: payload.id },
    select: { id: true } // só busca o necessário, mais leve
  });

  if (!userExists) return { req, res };

  return { userId: payload.id, token, req, res };
};

export { buildContext };
