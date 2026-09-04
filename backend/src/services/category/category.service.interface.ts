import {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input';
import { CategoryModel } from '@/models/category.model';

export interface ICategoryService {
  findAll(): Promise<CategoryModel[]>;
  create(data: CreateCategoryInput): Promise<CategoryModel>;
  update(id: string, data: UpdateCategoryInput): Promise<CategoryModel>;
  delete(id: string): Promise<CategoryModel>;
  findById(id: string): Promise<CategoryModel | null>;
  findCategoryWithMostTransactions(): Promise<CategoryModel>;
}
