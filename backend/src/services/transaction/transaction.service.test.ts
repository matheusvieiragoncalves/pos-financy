// backend/src/services/user/user.service.test.ts
import { CreateTransactionInput } from '@/dtos/input/transaction.input';
import { TransactionTypeEnum } from '@/enums';
import { Transaction } from '@/generated/prisma/client';
import { FakeCategoryService } from '@/test/fakes/fake-category.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prismaClient } from '../../../prisma/prisma';
import { ICategoryService } from '../category/category.service.interface';
import { TransactionService } from './transaction.service';

vi.mock('../../../prisma/prisma', () => ({
  prismaClient: {
    transaction: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
  }
}));

describe('TransactionService (unit)', () => {
  let service: TransactionService;
  let categoryService: ICategoryService;

  beforeEach(() => {
    categoryService = new FakeCategoryService();
    service = new TransactionService(categoryService);
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma transação', async () => {
      const fakeTransaction: CreateTransactionInput = {
        amount: 10,
        date: new Date(),
        type: TransactionTypeEnum.IN,
        description: 'Test',
        categoryId: '1'
      };

      const fakeUserId = '1';

      vi.mocked(prismaClient.transaction.create).mockResolvedValue({
        id: '1',
        ...fakeTransaction,
        userId: fakeUserId
      } as any);

      vi.mocked(categoryService.findById).mockResolvedValue({
        title: 'Category 1'
      } as any);

      const result = await service.create(fakeUserId, fakeTransaction);

      expect(result).toStrictEqual(
        expect.objectContaining({
          id: '1',
          ...fakeTransaction
        })
      );
    });

    it('não deve criar uma transação se a categoria não existir', async () => {
      const fakeTransaction: CreateTransactionInput = {
        amount: 10,
        date: new Date(),
        type: TransactionTypeEnum.IN,
        description: 'Test',
        categoryId: '1'
      };

      const fakeUserId = '1';

      vi.mocked(categoryService.findById).mockRejectedValue(null);

      await expect(service.create(fakeUserId, fakeTransaction)).rejects.toThrow(
        'Category not found'
      );

      expect(prismaClient.transaction.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as transações', async () => {
      vi.mocked(prismaClient.transaction.findMany).mockResolvedValue([
        {
          id: '1',
          amount: 10,
          date: new Date(),
          type: TransactionTypeEnum.IN,
          description: 'Test description',
          categoryId: '1',
          userId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          amount: 20,
          date: new Date(),
          type: TransactionTypeEnum.OUT,
          description: 'Test description 2',
          categoryId: '1',
          userId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
    });

    it('deve retornar um erro se encontrar um tipo inválido', async () => {
      const fakeTransaction: Transaction = {
        id: '1',
        amount: 10,
        date: new Date(),
        type: 'INVALID_TYPE' as TransactionTypeEnum,
        description: 'Test',
        categoryId: '1',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      vi.mocked(prismaClient.transaction.findMany).mockResolvedValue([
        fakeTransaction
      ]);

      await expect(service.findAll()).rejects.toThrow(
        `Tipo inválido encontrado no banco: ${fakeTransaction.type}`
      );
    });
  });

  describe('delete', () => {
    it('deve deletar uma transação existente', async () => {
      const fakeTransaction = {
        id: '1',
        amount: 10,
        date: new Date(),
        type: TransactionTypeEnum.IN,
        description: 'Test description',
        categoryId: '1',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const fakeUserId = '1';

      vi.mocked(prismaClient.transaction.findUnique).mockResolvedValue(
        fakeTransaction as any
      );
      vi.mocked(prismaClient.transaction.delete).mockResolvedValue(
        fakeTransaction as any
      );

      const result = await service.delete(fakeTransaction.id, fakeUserId);

      expect(result).toStrictEqual(fakeTransaction);
      expect(prismaClient.transaction.delete).toHaveBeenCalledWith({
        where: { id: fakeTransaction.id }
      });
    });

    it('deve lançar erro se a transação não existir', async () => {
      const fakeUserId = '1';

      vi.mocked(prismaClient.transaction.findUnique).mockResolvedValue(null);

      await expect(
        service.delete('id-inexistente', fakeUserId)
      ).rejects.toThrow('Transaction not found');
      expect(prismaClient.transaction.delete).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar uma transação existente', async () => {
      const fakeTransaction = {
        id: '1',
        amount: 10,
        date: new Date(),
        type: TransactionTypeEnum.IN,
        description: 'Test description',
        categoryId: '1',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const fakeUserId = '1';

      vi.mocked(prismaClient.transaction.findUnique).mockResolvedValue(
        fakeTransaction as any
      );

      vi.mocked(prismaClient.transaction.update).mockResolvedValue({
        ...fakeTransaction,
        description: 'Test description Updated'
      } as any);

      const result = await service.update(fakeTransaction.id, fakeUserId, {
        description: 'Test description Updated'
      });

      expect(result.description).toBe('Test description Updated');
      expect(prismaClient.transaction.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { description: 'Test description Updated' }
      });
    });

    it('deve lançar erro se a transação não existir', async () => {
      const fakeUserId = '1';

      vi.mocked(prismaClient.transaction.findUnique).mockResolvedValue(null);

      await expect(
        service.update('id-inexistente', fakeUserId, { description: 'Test' })
      ).rejects.toThrow('Transaction not found');

      expect(prismaClient.transaction.update).not.toHaveBeenCalled();
    });
  });
});
