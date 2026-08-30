import {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input';
import { isAuthenticated } from '@/middlewares/auth.middleware';
import { CategoryModel } from '@/models/category.model';
import { CategoryService } from '@/services/category/category.service';
import { ICategoryService } from '@/services/category/category.service.interface';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
@UseMiddleware(isAuthenticated)
export class CategoryResolver {
  constructor(
    private readonly categoryService: ICategoryService = new CategoryService()
  ) {}

  @Query(() => [CategoryModel])
  async categories(): Promise<CategoryModel[]> {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryModel)
  async categoryCreate(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput
  ): Promise<CategoryModel> {
    return this.categoryService.create(data);
  }

  @Mutation(() => CategoryModel)
  async categoryUpdate(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, data);
  }

  @Mutation(() => CategoryModel)
  async categoryDelete(
    @Arg('id', () => String) id: string
  ): Promise<CategoryModel> {
    return this.categoryService.delete(id);
  }
}
