// backend/src/services/user/user.service.test.ts
import { CategoryColorEnum, CategoryIconEnum } from '@/enums';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prismaClient } from '../../../prisma/prisma';
import { CategoryService } from './category.service';

vi.mock('../../../prisma/prisma', () => ({
  prismaClient: {
    category: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
  }
}));

describe('CategoryService (unit)', () => {
  let service: CategoryService;

  beforeEach(() => {
    service = new CategoryService();
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma categoria', async () => {
      const fakeCategory = {
        title: 'Test',
        description: 'Test description',
        icon: CategoryIconEnum.HOUSE,
        color: CategoryColorEnum.GREEN
      };

      const fakeUserId = '1';

      vi.mocked(prismaClient.category.findUnique).mockResolvedValue(null);
      vi.mocked(prismaClient.category.create).mockResolvedValue({
        id: '1',
        ...fakeCategory
      } as any);

      const result = await service.create(fakeUserId, fakeCategory);

      expect(result).toStrictEqual(
        expect.objectContaining({
          id: '1',
          title: fakeCategory.title,
          description: fakeCategory.description,
          icon: fakeCategory.icon,
          color: fakeCategory.color
        })
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as categorias', async () => {
      vi.mocked(prismaClient.category.findMany).mockResolvedValue([
        {
          id: '1',
          title: 'Test',
          description: 'Test description',
          icon: CategoryIconEnum.HOUSE,
          color: CategoryColorEnum.GREEN
        },
        {
          id: '2',
          title: 'Test 2',
          description: 'Test description 2',
          icon: CategoryIconEnum.HOUSE,
          color: CategoryColorEnum.GREEN
        }
      ] as any);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Test');
      expect(result[1].title).toBe('Test 2');
    });
  });

  describe('delete', () => {
    it('deve lançar erro se a categoria não existir', async () => {
      vi.mocked(prismaClient.category.findUnique).mockResolvedValue(null);

      const fakeUserId = '1';

      await expect(
        service.delete('id-inexistente', fakeUserId)
      ).rejects.toThrow('Categoria não encontrada');
      expect(prismaClient.category.delete).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar uma categoria existente', async () => {
      const fakeUserId = '1';

      const fakeCategory = {
        id: '1',
        title: 'test',
        description: 'test description',
        icon: CategoryIconEnum.HOUSE,
        color: CategoryColorEnum.GREEN,
        userId: fakeUserId
      };

      vi.mocked(prismaClient.category.findUnique).mockResolvedValue(
        fakeCategory as any
      );

      vi.mocked(prismaClient.category.update).mockResolvedValue({
        ...fakeCategory,
        title: 'test Updated'
      } as any);

      const result = await service.update('1', fakeUserId, {
        title: 'test Updated'
      });

      expect(result.title).toBe('test Updated');
      expect(prismaClient.category.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { title: 'test Updated' }
      });
    });

    it('deve lançar erro se a categoria não existir', async () => {
      const fakeUserId = '1';

      vi.mocked(prismaClient.category.findUnique).mockResolvedValue(null);

      await expect(
        service.update('id-inexistente', fakeUserId, { title: 'Test' })
      ).rejects.toThrow('Categoria não encontrada');

      expect(prismaClient.category.update).not.toHaveBeenCalled();
    });
  });
});
