export interface IJwtPayload {
  id: string;
  email: string;
}

export interface IJwtService {
  sign(payload: IJwtPayload): string;
  verify(token: string): IJwtPayload | null;
}
