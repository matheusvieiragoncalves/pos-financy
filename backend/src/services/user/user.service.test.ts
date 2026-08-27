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

describe('UserService (unit)', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um usuário quando o email não existe', async () => {
      vi.mocked(prismaClient.user.findUnique).mockResolvedValue(null);
      vi.mocked(prismaClient.user.create).mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@test.com',
        hashPassword: '123456'
      } as any);

      const result = await service.create({
        name: 'John',
        email: 'john@test.com',
        password: '123456'
      });

      expect(result.email).toBe('john@test.com');
      expect(prismaClient.user.create).toHaveBeenCalledWith({
        data: { name: 'John', email: 'john@test.com', hashPassword: '123456' }
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
      ).rejects.toThrow('User already exists');

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
        'User not found'
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
      ).rejects.toThrow('User not found');

      expect(prismaClient.user.update).not.toHaveBeenCalled();
    });
  });
});
