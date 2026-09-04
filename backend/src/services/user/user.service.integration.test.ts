import { describe, expect, it } from 'vitest';
import { PasswordService } from '../password/password.service';
import { UserService } from './user.service';

describe('UserService (integration)', () => {
  const service = new UserService(new PasswordService());

  it('deve criar o usuário com a senha real hasheada no banco', async () => {
    const created = await service.create({
      name: 'Maria',
      email: 'maria@test.com',
      password: '123456'
    });

    expect(created.user.hashPassword).not.toBe('123456');

    const passwordService = new PasswordService();
    const isValid = await passwordService.compare(
      '123456',
      created.user.hashPassword as string
    );
    expect(isValid).toBe(true);
  });

  it('deve impedir criação de usuário com email duplicado', async () => {
    await service.create({ name: 'A', email: 'dup@test.com', password: '123' });

    await expect(
      service.create({ name: 'B', email: 'dup@test.com', password: '456' })
    ).rejects.toThrow('Usuário já existe');
  });

  it('deve atualizar um usuário existente', async () => {
    const response = await service.create({
      name: 'Carlos',
      email: 'carlos@test.com',
      password: '123'
    });

    const updated = await service.update(response.user.id, {
      name: 'Carlos Silva'
    });

    expect(updated.name).toBe('Carlos Silva');
  });

  it('deve lançar erro ao atualizar usuário inexistente', async () => {
    await expect(
      service.update('id-que-nao-existe', { name: 'Ghost' })
    ).rejects.toThrow('Usuário não encontrado');
  });

  it('deve deletar um usuário existente', async () => {
    const response = await service.create({
      name: 'Delete Me',
      email: 'delete@test.com',
      password: '123'
    });

    const deleted = await service.delete(response.user.id);

    expect(deleted.id).toBe(response.user.id);

    const all = await service.findAll();
    expect(all).toHaveLength(0);
  });
});
