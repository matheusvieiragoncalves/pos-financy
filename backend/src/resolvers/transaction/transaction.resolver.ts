import { CurrentUserId } from '@/decorators/current-user-id.decorator';
import {
  CreateTransactionInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input';
import { TransactionsTotalOutput } from '@/dtos/output/total.output';
import { isAuthenticated } from '@/middlewares/auth.middleware';
import { CategoryModel } from '@/models/category.model';
import { TransactionModel } from '@/models/transaction.model';
import { CategoryService } from '@/services/category/category.service';
import { ICategoryService } from '@/services/category/category.service.interface';
import { TransactionService } from '@/services/transaction/transaction.service';
import { ITransactionService } from '@/services/transaction/transaction.service.interface';
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';

@Resolver(() => TransactionModel)
@UseMiddleware(isAuthenticated)
export class TransactionResolver {
  constructor(
    private readonly transactionService: ITransactionService = new TransactionService(),
    private readonly categoryService: ICategoryService = new CategoryService()
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

  @Query(() => TransactionsTotalOutput)
  async transactionTotal(
    @CurrentUserId() currentUserId: string
  ): Promise<TransactionsTotalOutput> {
    return this.transactionService.calculeTotal(currentUserId);
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel
  ): Promise<CategoryModel | null> {
    return this.categoryService.findById(transaction.categoryId);
  }
}
