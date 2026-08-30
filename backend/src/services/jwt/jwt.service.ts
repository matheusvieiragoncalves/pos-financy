// backend/src/services/jwt/jwt.service.ts
import jwt from 'jsonwebtoken';
import { IJwtPayload, IJwtService } from './jwt.service.interface';

export class JwtService implements IJwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET não definido nas variáveis de ambiente');
    }

    this.secret = secret;
    this.expiresIn = process.env.JWT_EXPIRES_IN ?? '1d';
  }

  sign(payload: IJwtPayload): { accessToken: string } {
    const accessToken = jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn
    } as jwt.SignOptions);

    return { accessToken };
  }

  verify(token: string): IJwtPayload | null {
    try {
      return jwt.verify(token, this.secret) as IJwtPayload;
    } catch {
      return null; // token inválido, expirado ou malformado
    }
  }
}
