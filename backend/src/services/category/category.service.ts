import { prismaClient } from '../../../prisma/prisma';

import {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input';
import {
  CATEGORY_COLOR_HEX_MAP,
  CategoryColorEnum,
  CategoryIconEnum
} from '@/enums';
import { NotFoundError } from '@/errors/not-found-error';
import { Category } from '@/generated/prisma/client';
import { CategoryModel } from '@/models/category.model';
import { ICategoryService } from './category.service.interface';

export class CategoryService implements ICategoryService {
  async findById(id: string): Promise<CategoryModel> {
    const category = await prismaClient.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return this._toCategoryModel(category);
  }

  async findAll(): Promise<CategoryModel[]> {
    const categories = await prismaClient.category.findMany();
    return categories.map((category) => this._toCategoryModel(category));
  }

  async create(data: CreateCategoryInput): Promise<CategoryModel> {
    const category = await prismaClient.category.create({ data });
    return this._toCategoryModel(category);
  }

  async update(id: string, data: UpdateCategoryInput): Promise<CategoryModel> {
    await this.findById(id);

    const updatedCategory = await prismaClient.category.update({
      where: { id },
      data
    });

    return this._toCategoryModel(updatedCategory);
  }

  async delete(id: string): Promise<CategoryModel> {
    await this.findById(id);

    const deletedCategory = await prismaClient.category.delete({
      where: { id }
    });

    return this._toCategoryModel(deletedCategory);
  }

  private _toCategoryModel(category: Category): CategoryModel {
    const { icon, color } = category;

    this._verifyIconIsValid(icon);
    this._verifyColorIsValid(color);

    return {
      ...category,
      icon: icon as CategoryIconEnum,
      color: color as CategoryColorEnum,
      hexColor: this._getHexColor(color)
    };
  }

  private _verifyIconIsValid(icon: string): void {
    if (!Object.values(CategoryIconEnum).includes(icon as CategoryIconEnum)) {
      throw new Error(`Ícone inválido encontrado no banco: ${icon}`);
    }
  }

  private _verifyColorIsValid(color: string): void {
    if (
      !Object.values(CategoryColorEnum).includes(color as CategoryColorEnum)
    ) {
      throw new Error(`Cor inválida encontrada no banco: ${color}`);
    }
  }

  private _getHexColor(color: string): string {
    const hexColor = CATEGORY_COLOR_HEX_MAP[color as CategoryColorEnum];

    if (!hexColor) {
      throw new Error(`Hex color not found for color: ${color}`);
    }

    return hexColor;
  }
}
