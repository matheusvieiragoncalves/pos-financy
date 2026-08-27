// backend/src/test/fakes/fake-password.service.ts
import { IPasswordService } from '@/services/password/password.service.interface';

export class FakePasswordService implements IPasswordService {
  async hash(plainPassword: string): Promise<string> {
    return `hashed-${plainPassword}`;
  }

  async compare(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return hashedPassword === `hashed-${plainPassword}`;
  }
}
