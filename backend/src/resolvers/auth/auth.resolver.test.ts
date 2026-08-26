import { describe, expect, it } from 'vitest';
import { AuthResolver } from './auth.resolver';

describe('AuthResolver (unit)', () => {
  it('deve retornar Hello World ao logar', async () => {
    const resolver = new AuthResolver();
    const result = await resolver.login({
      email: 'teste@teste.com',
      password: '123456'
    });

    expect(result).toBe('Hello World');
  });

  it('deve lançar UnauthorizedError se as credenciais forem inválidas', async () => {
    const resolver = new AuthResolver();
    await expect(
      resolver.login({
        email: '',
        password: ''
      })
    ).rejects.toThrow('Credenciais inválidas');
  });
});
