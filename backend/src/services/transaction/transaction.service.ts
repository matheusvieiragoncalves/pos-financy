import { prismaClient } from '../../../prisma/prisma';

import { PaginationInput } from '@/dtos/input/pagination.input';
import {
  CreateTransactionInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input';
import { TransactionsTotalOutput } from '@/dtos/output/total.output';
import { TransactionPaginatedOutput } from '@/dtos/output/transaction-paginated.output';
import { TransactionTypeEnum } from '@/enums';

import { NotFoundError, UnauthorizedError } from '@/errors';

import { Transaction } from '@/generated/prisma/client';
import { TransactionModel } from '@/models/transaction.model';
import { CategoryService } from '../category/category.service';
import { ICategoryService } from '../category/category.service.interface';
import { ITransactionService } from './transaction.service.interface';

export class TransactionService implements ITransactionService {
  constructor(
    private readonly categoryService: ICategoryService = new CategoryService()
  ) {}

  async findById(id: string): Promise<TransactionModel> {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id }
    });

    if (!transaction) {
      throw new NotFoundError('Transação não encontrada');
    }

    return this._toTransactionModel(transaction);
  }

  async findAll(): Promise<TransactionModel[]> {
    const transactions = await prismaClient.transaction.findMany();
    return transactions.map((transaction) =>
      this._toTransactionModel(transaction)
    );
  }

  async findByUserId(userId: string): Promise<TransactionModel[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: { userId }
    });
    return transactions.map((transaction) =>
      this._toTransactionModel(transaction)
    );
  }

  async findByUserIdPaginated(
    userId: string,
    { page, perPage }: PaginationInput
  ): Promise<TransactionPaginatedOutput> {
    const skip = (page - 1) * perPage;

    const [transactions, totalItems] = await Promise.all([
      prismaClient.transaction.findMany({
        where: { userId },
        skip,
        take: perPage,
        orderBy: { date: 'desc' }
      }),
      prismaClient.transaction.count({
        where: { userId }
      })
    ]);

    return {
      items: transactions.map((t) => this._toTransactionModel(t)),
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / perPage),
      perPage
    };
  }

  async create(
    userId: string,
    data: CreateTransactionInput
  ): Promise<TransactionModel> {
    const { categoryId } = data;

    await this.categoryService.findById(categoryId);

    const transaction = await prismaClient.transaction.create({
      data: { ...data, userId }
    });

    return this._toTransactionModel(transaction);
  }

  async update(
    transactionId: string,
    currentUserId: string,
    data: UpdateTransactionInput
  ): Promise<TransactionModel> {
    const { userId } = await this.findById(transactionId);

    if (userId !== currentUserId) {
      throw new UnauthorizedError(
        'Você não está autorizado a atualizar esta transação'
      );
    }

    const updatedTransaction = await prismaClient.transaction.update({
      where: { id: transactionId },
      data
    });

    return this._toTransactionModel(updatedTransaction);
  }

  async delete(
    transactionId: string,
    currentUserId: string
  ): Promise<TransactionModel> {
    const { userId } = await this.findById(transactionId);

    if (userId !== currentUserId) {
      throw new UnauthorizedError(
        'Você não está autorizado a excluir esta transação'
      );
    }

    const deletedTransaction = await prismaClient.transaction.delete({
      where: { id: transactionId }
    });

    return this._toTransactionModel(deletedTransaction);
  }

  private _toTransactionModel(transaction: Transaction): TransactionModel {
    const { type } = transaction;

    this._verifyTransactionTypeIsValid(type);

    return {
      ...transaction,
      type: type as TransactionTypeEnum
    };
  }

  private _verifyTransactionTypeIsValid(type: string): void {
    if (
      !Object.values(TransactionTypeEnum).includes(type as TransactionTypeEnum)
    ) {
      throw new Error(`Tipo inválido encontrado no banco: ${type}`);
    }
  }

  async calculeTotal(userId: string): Promise<TransactionsTotalOutput> {
    const result = await prismaClient.transaction.groupBy({
      by: ['type'],
      where: {
        userId
      },
      _sum: {
        amount: true
      }
    });

    const totalIn = result.find((r) => r.type === 'IN')?._sum.amount ?? 0;
    const totalOut = result.find((r) => r.type === 'OUT')?._sum.amount ?? 0;
    const total = totalIn - totalOut;

    return { totalIn, totalOut, total };
  }

  async getCountByCategoryId(categoryId: string): Promise<number> {
    const count = await prismaClient.transaction.count({
      where: { categoryId }
    });

    return count;
  }
}
