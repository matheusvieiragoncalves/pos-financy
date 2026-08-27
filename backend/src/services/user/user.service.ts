import { CreateUserInput, UpdateUserInput } from '@/dtos/input/user.input';
import { UserModel } from '@/models/user.model.js';
import { prismaClient } from '../../../prisma/prisma';

export class UserService {
  private async _findById(id: string): Promise<UserModel> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  private async _findByEmail(email: string): Promise<UserModel | null> {
    return prismaClient.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<UserModel[]> {
    return prismaClient.user.findMany();
  }

  async create(data: CreateUserInput): Promise<UserModel> {
    const { name, email, password } = data;

    const user = await this._findByEmail(email);

    if (user) {
      throw new Error('User already exists');
    }

    return await prismaClient.user.create({
      data: {
        name,
        email,
        hashPassword: password
      }
    });
  }

  async update(id: string, data: UpdateUserInput): Promise<UserModel> {
    const { name, email } = data;

    const user = await this._findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return await prismaClient.user.update({
      where: { id },
      data: { name, email }
    });
  }

  async delete(id: string): Promise<UserModel> {
    const user = await this._findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const deletedUser = await prismaClient.user.delete({ where: { id } });

    return deletedUser;
  }
}
