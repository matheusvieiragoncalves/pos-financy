import { JwtService } from '@/services/jwt/jwt.service';
import { ExpressContextFunctionArgument } from '@as-integrations/express5';

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
  const authHeader = req.headers.authorization || '';

  let token: string | undefined;
  let userId: string | undefined;

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring('Bearer '.length);
    try {
      const decodedToken = jwtService.verify(token);
      userId = decodedToken?.id;
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  return { userId, token, req, res };
};

export { buildContext };
