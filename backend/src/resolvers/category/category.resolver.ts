import { CurrentUserId } from '@/decorators/current-user-id.decorator';
import {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input';
import { isAuthenticated } from '@/middlewares/auth.middleware';
import { CategoryModel } from '@/models/category.model';
import { CategoryService } from '@/services/category/category.service';
import { ICategoryService } from '@/services/category/category.service.interface';
import { TransactionService } from '@/services/transaction/transaction.service';
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';

@Resolver(() => CategoryModel)
@UseMiddleware(isAuthenticated)
export class CategoryResolver {
  constructor(
    private readonly categoryService: ICategoryService = new CategoryService(),
    private readonly transactionService: TransactionService = new TransactionService()
  ) {}

  @Query(() => [CategoryModel])
  async categories(
    @CurrentUserId() currentUserId: string
  ): Promise<CategoryModel[]> {
    return this.categoryService.findByUserId(currentUserId);
  }

  @Mutation(() => CategoryModel)
  async categoryCreate(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @CurrentUserId() currentUserId: string
  ): Promise<CategoryModel> {
    return this.categoryService.create(currentUserId, data);
  }

  @Mutation(() => CategoryModel)
  async categoryUpdate(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @CurrentUserId() currentUserId: string
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, currentUserId, data);
  }

  @Mutation(() => CategoryModel)
  async categoryDelete(
    @Arg('id', () => String) id: string,
    @CurrentUserId() currentUserId: string
  ): Promise<CategoryModel> {
    return this.categoryService.delete(id, currentUserId);
  }

  @Query(() => CategoryModel, { nullable: true })
  async categoryWithMostTransactions(
    @CurrentUserId() currentUserId: string
  ): Promise<CategoryModel | null> {
    return this.categoryService.findCategoryWithMostTransactions(currentUserId);
  }

  @FieldResolver(() => Number, { nullable: true })
  async countTransactions(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.getCountByCategoryId(category.id);
  }
}
