// backend/src/services/user/user.service.test.ts
import { FakePasswordService } from '@/test/fakes/fake-password.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prismaClient } from '../../../prisma/prisma';
import { UserService } from './user.service';

vi.mock('../../../prisma/prisma', () => ({
  prismaClient: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
  }
}));

describe.only('UserService (unit)', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService(new FakePasswordService());
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um usuário com a senha já hasheada', async () => {
      vi.mocked(prismaClient.user.findUnique).mockResolvedValue(null);
      vi.mocked(prismaClient.user.create).mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@test.com',
        hashPassword: 'hashed-123456'
      } as any);

      const result = await service.create({
        name: 'John',
        email: 'john@test.com',
        password: '123456'
      });

      expect(result.user.hashPassword).toBe('hashed-123456');
      expect(prismaClient.user.create).toHaveBeenCalledWith({
        data: {
          name: 'John',
          email: 'john@test.com',
          hashPassword: 'hashed-123456'
        }
      });
    });

    it('deve lançar erro se o email já existe', async () => {
      vi.mocked(prismaClient.user.findUnique).mockResolvedValue({
        id: '1',
        email: 'john@test.com'
      } as any);

      await expect(
        service.create({
          name: 'John',
          email: 'john@test.com',
          password: '123456'
        })
      ).rejects.toThrow('Usuário já existe');

      expect(prismaClient.user.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários', async () => {
      vi.mocked(prismaClient.user.findMany).mockResolvedValue([
        { id: '1', name: 'John', email: 'john@test.com' }
      ] as any);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].email).toBe('john@test.com');
    });
  });

  describe('delete', () => {
    it('deve lançar erro se o usuário não existir', async () => {
      vi.mocked(prismaClient.user.findUnique).mockResolvedValue(null);

      await expect(service.delete('id-inexistente')).rejects.toThrow(
        'Usuário não encontrado'
      );
      expect(prismaClient.user.delete).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário existente', async () => {
      vi.mocked(prismaClient.user.findUnique).mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@test.com'
      } as any);

      vi.mocked(prismaClient.user.update).mockResolvedValue({
        id: '1',
        name: 'John Updated',
        email: 'john@test.com'
      } as any);

      const result = await service.update('1', { name: 'John Updated' });

      expect(result.name).toBe('John Updated');
      expect(prismaClient.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { name: 'John Updated' }
      });
    });

    it('deve lançar erro se o usuário não existir', async () => {
      vi.mocked(prismaClient.user.findUnique).mockResolvedValue(null);

      await expect(
        service.update('id-inexistente', { name: 'John' })
      ).rejects.toThrow('Usuário não encontrado');

      expect(prismaClient.user.update).not.toHaveBeenCalled();
    });
  });
});
