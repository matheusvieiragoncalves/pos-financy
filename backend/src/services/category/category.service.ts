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

import { BadRequestError, NotFoundError, UnauthorizedError } from '@/errors';

import { Category } from '@/generated/prisma/client';
import { CategoryModel } from '@/models/category.model';
import { ICategoryService } from './category.service.interface';

export class CategoryService implements ICategoryService {
  async findById(id: string): Promise<CategoryModel> {
    const category = await prismaClient.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }

    return this._toCategoryModel(category);
  }

  async findAll(): Promise<CategoryModel[]> {
    const categories = await prismaClient.category.findMany();
    return categories.map((category) => this._toCategoryModel(category));
  }

  async findByUserId(userId: string): Promise<CategoryModel[]> {
    const categories = await prismaClient.category.findMany({
      where: { userId }
    });
    return categories.map((category) => this._toCategoryModel(category));
  }

  async create(
    userId: string,
    data: CreateCategoryInput
  ): Promise<CategoryModel> {
    const category = await prismaClient.category.create({
      data: { ...data, userId }
    });
    return this._toCategoryModel(category);
  }

  async update(
    id: string,
    currentUserId: string,
    data: UpdateCategoryInput
  ): Promise<CategoryModel> {
    const { userId } = await this.findById(id);

    if (userId !== currentUserId) {
      throw new UnauthorizedError(
        'Você não está autorizado a atualizar esta categoria'
      );
    }

    const updatedCategory = await prismaClient.category.update({
      where: { id },
      data
    });

    return this._toCategoryModel(updatedCategory);
  }

  async delete(id: string, currentUserId: string): Promise<CategoryModel> {
    const { userId } = await this.findById(id);

    if (userId !== currentUserId) {
      throw new UnauthorizedError(
        'Você não está autorizado a excluir esta categoria'
      );
    }

    const hasTransactions = await prismaClient.transaction.count({
      where: { categoryId: id }
    });

    if (hasTransactions > 0) {
      throw new BadRequestError(
        'Não é possível excluir uma categoria com transações existentes'
      );
    }

    const deletedCategory = await prismaClient.category.delete({
      where: { id }
    });

    return this._toCategoryModel(deletedCategory);
  }

  async findCategoryWithMostTransactions(
    currentUserId: string
  ): Promise<CategoryModel | null> {
    const category = await prismaClient.category.findFirst({
      where: {
        userId: currentUserId
      },
      orderBy: {
        transactions: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: { transactions: true }
        }
      }
    });

    if (!category || !category?._count?.transactions) {
      return null;
    }

    return this._toCategoryModel(category);
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
