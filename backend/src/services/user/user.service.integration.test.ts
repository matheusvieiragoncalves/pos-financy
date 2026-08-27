import { describe, expect, it } from 'vitest';
import { UserService } from './user.service';

describe('UserService (integration)', () => {
  const service = new UserService();

  it('deve criar e depois encontrar o usuário no banco', async () => {
    const created = await service.create({
      name: 'Maria',
      email: 'maria@test.com',
      password: '123456'
    });

    expect(created.id).toBeDefined();

    const all = await service.findAll();
    expect(all).toHaveLength(1);
    expect(all[0].email).toBe('maria@test.com');
  });

  it('deve impedir criação de usuário com email duplicado', async () => {
    await service.create({ name: 'A', email: 'dup@test.com', password: '123' });

    await expect(
      service.create({ name: 'B', email: 'dup@test.com', password: '456' })
    ).rejects.toThrow('User already exists');
  });

  it('deve atualizar um usuário existente', async () => {
    const user = await service.create({
      name: 'Carlos',
      email: 'carlos@test.com',
      password: '123'
    });

    const updated = await service.update(user.id, { name: 'Carlos Silva' });

    expect(updated.name).toBe('Carlos Silva');
  });

  it('deve lançar erro ao atualizar usuário inexistente', async () => {
    await expect(
      service.update('id-que-nao-existe', { name: 'Ghost' })
    ).rejects.toThrow('User not found');
  });

  it('deve deletar um usuário existente', async () => {
    const user = await service.create({
      name: 'Delete Me',
      email: 'delete@test.com',
      password: '123'
    });

    const deleted = await service.delete(user.id);

    expect(deleted.id).toBe(user.id);

    const all = await service.findAll();
    expect(all).toHaveLength(0);
  });
});
