// backend/src/resolvers/auth/auth.resolver.test.ts
import { FakePasswordService } from '@/test/fakes/fake-password.service';
import { FakeUserService } from '@/test/fakes/fake-user.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthResolver } from './auth.resolver';

describe('AuthResolver (unit)', () => {
  let userService: FakeUserService;
  let passwordService: FakePasswordService;
  let resolver: AuthResolver;

  beforeEach(() => {
    userService = new FakeUserService();
    passwordService = new FakePasswordService();
    resolver = new AuthResolver(userService, passwordService);
  });

  it('deve autenticar com credenciais válidas', async () => {
    userService.findByEmail.mockResolvedValue({
      id: '1',
      email: 'john@test.com',
      hashPassword: 'hashed-123456'
    } as any);

    const result = await resolver.login({
      email: 'john@test.com',
      password: '123456'
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        accessToken: expect.any(String)
      })
    );
  });

  it('deve rejeitar quando o usuário não existe', async () => {
    userService.findByEmail.mockResolvedValue(null);

    await expect(
      resolver.login({ email: 'ghost@test.com', password: '123456' })
    ).rejects.toThrow('Credenciais inválidas');
  });

  it('deve rejeitar quando a senha está incorreta', async () => {
    userService.findByEmail.mockResolvedValue({
      id: '1',
      email: 'john@test.com',
      hashPassword: 'hashed-outrasenha'
    } as any);

    await expect(
      resolver.login({ email: 'john@test.com', password: '123456' })
    ).rejects.toThrow('Credenciais inválidas');
  });
});
