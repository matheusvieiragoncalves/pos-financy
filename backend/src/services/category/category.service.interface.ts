import {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input';
import { CategoryModel } from '@/models/category.model';

export interface ICategoryService {
  findAll(): Promise<CategoryModel[]>;
  findByUserId(id: string): Promise<CategoryModel[]>;
  create(userId: string, data: CreateCategoryInput): Promise<CategoryModel>;
  update(
    id: string,
    currentUserId: string,
    data: UpdateCategoryInput
  ): Promise<CategoryModel>;
  delete(id: string, currentUserId: string): Promise<CategoryModel>;
  findById(id: string): Promise<CategoryModel | null>;
  findCategoryWithMostTransactions(
    currentUserId: string
  ): Promise<CategoryModel | null>;
}
