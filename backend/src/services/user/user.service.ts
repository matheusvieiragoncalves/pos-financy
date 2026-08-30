import { CreateUserInput, UpdateUserInput } from '@/dtos/input/user.input';
import { BadRequestError } from '@/errors/bad-request';
import { UserModel } from '@/models/user.model.js';
import { prismaClient } from '../../../prisma/prisma';
import { PasswordService } from '../password/password.service';
import { IPasswordService } from '../password/password.service.interface';
import { IUserService } from './user.service.interface';

export class UserService implements IUserService {
  constructor(
    private readonly passwordService: IPasswordService = new PasswordService()
  ) {}

  private async _findById(id: string): Promise<UserModel> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return prismaClient.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<UserModel[]> {
    return prismaClient.user.findMany();
  }

  async create(data: CreateUserInput): Promise<UserModel> {
    const { name, email, password } = data;

    const user = await this.findByEmail(email);

    if (user) {
      throw new BadRequestError('User already exists');
    }

    const hashedPassword = await this.passwordService.hash(password);

    return await prismaClient.user.create({
      data: {
        name,
        email,
        hashPassword: hashedPassword
      }
    });
  }

  async update(id: string, data: UpdateUserInput): Promise<UserModel> {
    const { name, email } = data;

    const user = await this._findById(id);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    return await prismaClient.user.update({
      where: { id },
      data: { name, email }
    });
  }

  async delete(id: string): Promise<UserModel> {
    const user = await this._findById(id);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const deletedUser = await prismaClient.user.delete({ where: { id } });

    return deletedUser;
  }
}
