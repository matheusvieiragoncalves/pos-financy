import {
  CreateTransactionInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input';
import { TransactionsTotalOutput } from '@/dtos/output/total.output';

import { TransactionModel } from '@/models/transaction.model';

export interface ITransactionService {
  findAll(): Promise<TransactionModel[]>;
  findByUserId(id: string): Promise<TransactionModel[]>;
  create(
    userId: string,
    data: CreateTransactionInput
  ): Promise<TransactionModel>;
  update(
    transactionId: string,
    currentUserId: string,
    data: UpdateTransactionInput
  ): Promise<TransactionModel>;
  delete(
    transactionId: string,
    currentUserId: string
  ): Promise<TransactionModel>;
  findById(id: string): Promise<TransactionModel | null>;
  calculeTotal(userId: string): Promise<TransactionsTotalOutput>;
  getCountByCategoryId(categoryId: string): Promise<number>;
}
