import bcrypt from 'bcrypt';
import { IPasswordService } from './password.service.interface';

const SALT_ROUNDS = 10;

export class PasswordService implements IPasswordService {
  async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
  }

  async compare(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
