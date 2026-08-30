// backend/src/services/jwt/jwt.service.test.ts
import { describe, expect, it } from 'vitest';
import { JwtService } from './jwt.service';

describe('JwtService (unit)', () => {
  const service = new JwtService();

  it('deve gerar e verificar um token válido', () => {
    const { accessToken } = service.sign({ id: '1', email: 'teste@teste.com' });
    const payload = service.verify(accessToken);

    expect(payload?.id).toBe('1');
    expect(payload?.email).toBe('teste@teste.com');
  });

  it('deve retornar null para um token inválido', () => {
    const payload = service.verify('token-invalido-qualquer');
    expect(payload).toBeNull();
  });

  it('deve retornar null para um token expirado', async () => {
    process.env.JWT_EXPIRES_IN = '1ms';
    const shortLivedService = new JwtService();
    const { accessToken: shortLivedToken } = shortLivedService.sign({
      id: '1',
      email: 'teste@teste.com'
    });

    await new Promise((resolve) => setTimeout(resolve, 10));

    const payload = shortLivedService.verify(shortLivedToken);
    expect(payload).toBeNull();
  });
});
