import { describe, expect, it } from 'vitest';
import { PasswordService } from './password.service';

describe('PasswordService (unit)', () => {
  const service = new PasswordService();

  it('deve gerar um hash diferente da senha original', async () => {
    const hash = await service.hash('minhaSenha123');

    expect(hash).not.toBe('minhaSenha123');
    expect(hash.length).toBeGreaterThan(0);
  });

  it('deve validar corretamente a senha original contra o hash', async () => {
    const hash = await service.hash('minhaSenha123');

    const isValid = await service.compare('minhaSenha123', hash);
    expect(isValid).toBe(true);
  });

  it('deve rejeitar uma senha incorreta', async () => {
    const hash = await service.hash('minhaSenha123');

    const isValid = await service.compare('senhaErrada', hash);
    expect(isValid).toBe(false);
  });
});
