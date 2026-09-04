import { createApp } from '@/app';
import { CreateTransactionInput } from '@/dtos/input/transaction.input';
import {
  CategoryColorEnum,
  CategoryIconEnum,
  TransactionTypeEnum
} from '@/enums';
import { TransactionModel } from '@/models/transaction.model';
import { UserModel } from '@/models/user.model';
import { CategoryService } from '@/services/category/category.service';
import { PasswordService } from '@/services/password/password.service';
import { TransactionService } from '@/services/transaction/transaction.service';
import { UserService } from '@/services/user/user.service';
import type { Express } from 'express';
import request from 'supertest';

let appPromise: Promise<Express> | null = null;

/**
 * Ensures that the Express app is created only once and reused across tests.
 */
function getApp() {
  if (!appPromise) {
    appPromise = createApp();
  }
  return appPromise;
}

/**
 * This function creates a test client for making HTTP requests to the Express app.
 */
export async function createTestClient() {
  const app = await getApp();
  return request(app);
}

/**
 * This function creates an authenticated test user and returns the user along with a JWT token.
 * @returns An object containing the created user and a JWT access token.
 *          The object has the following structure:
 *          {
 *            user: UserModel,
 *            accessToken: string
 *          }
 */
export async function createAuthenticatedTestUser(overrides?: {
  name?: string;
  email?: string;
  password?: string;
}): Promise<{ user: UserModel; accessToken: string }> {
  const userService = new UserService(new PasswordService());

  const { user, accessToken } = await userService.create({
    name: overrides?.name ?? 'Teste',
    email: overrides?.email ?? `teste-${Date.now()}@teste.com`, // evita colisão entre testes
    password: overrides?.password ?? '123456'
  });

  return { user, accessToken };
}

/**
 * This function creates a test user without authentication and returns the user.
 * @returns An object containing the created user.
 *          The object has the following structure:
 *          {
 *            user: UserModel
 *          }
 */
export async function createTestUser(overrides?: {
  name?: string;
  email?: string;
  password?: string;
}): Promise<{ user: UserModel }> {
  const userService = new UserService(new PasswordService());
  const { user } = await userService.create({
    name: overrides?.name ?? 'Teste',
    email: overrides?.email ?? `teste-${Date.now()}@teste.com`,
    password: overrides?.password ?? '123456'
  });
  return { user };
}

export async function createTestCategory(
  currentUserId: string,
  overrides?: {
    title?: string;
    description?: string;
    color?: string;
    icon?: string;
  }
): Promise<{ category: any }> {
  const categoryService = new CategoryService();

  const category = await categoryService.create(currentUserId, {
    title: overrides?.title ?? 'Categoria de Teste',
    description: overrides?.description ?? 'Descrição da categoria de teste',
    color: (overrides?.color ?? CategoryColorEnum.GREEN) as CategoryColorEnum,
    icon: (overrides?.icon ?? CategoryIconEnum.HOUSE) as CategoryIconEnum
  });

  return { category };
}

export async function createTestTransaction(
  currentUserId: string,
  overrides?: Partial<CreateTransactionInput>
): Promise<{ transaction: TransactionModel }> {
  const categoryId =
    overrides?.categoryId ??
    (await createTestCategory(currentUserId).then(
      ({ category }) => category.id
    ));

  const attributes: CreateTransactionInput = {
    amount: overrides?.amount ?? 100,
    description: overrides?.description ?? 'Descrição da transação de teste',
    date: overrides?.date ?? new Date(),
    type: overrides?.type ?? TransactionTypeEnum.IN,
    categoryId
  };

  const transactionService = new TransactionService();

  const transaction = await transactionService.create(
    currentUserId,
    attributes
  );

  return { transaction };
}
