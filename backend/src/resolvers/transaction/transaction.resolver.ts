import { CurrentUserId } from '@/decorators/current-user-id.decorator';
import {
  CreateTransactionInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input';
import { isAuthenticated } from '@/middlewares/auth.middleware';
import { TransactionModel } from '@/models/transaction.model';
import { TransactionService } from '@/services/transaction/transaction.service';
import { ITransactionService } from '@/services/transaction/transaction.service.interface';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver(() => TransactionModel)
@UseMiddleware(isAuthenticated)
export class TransactionResolver {
  constructor(
    private readonly transactionService: ITransactionService = new TransactionService()
  ) {}

  @Query(() => [TransactionModel])
  async transactions(
    @CurrentUserId() currentUserId: string
  ): Promise<TransactionModel[]> {
    return this.transactionService.findByUserId(currentUserId);
  }

  @Mutation(() => TransactionModel)
  async transactionCreate(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @CurrentUserId() currentUserId: string
  ): Promise<TransactionModel> {
    return this.transactionService.create(currentUserId, data);
  }

  @Mutation(() => TransactionModel)
  async transactionUpdate(
    @Arg('id', () => String) transactionId: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @CurrentUserId() currentUserId: string
  ): Promise<TransactionModel> {
    return this.transactionService.update(transactionId, currentUserId, data);
  }

  @Mutation(() => TransactionModel)
  async transactionDelete(
    @Arg('id', () => String) transactionId: string,
    @CurrentUserId() currentUserId: string
  ): Promise<TransactionModel> {
    return this.transactionService.delete(transactionId, currentUserId);
  }
}
