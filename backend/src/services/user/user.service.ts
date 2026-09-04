import { CreateUserInput, UpdateUserInput } from '@/dtos/input/user.input';
import { CreateUserOutput } from '@/dtos/output/create-user.output';
import { BadRequestError } from '@/errors/bad-request';
import { UserModel } from '@/models/user.model.js';
import { prismaClient } from '../../../prisma/prisma';
import { JwtService } from '../jwt/jwt.service';
import { IJwtService } from '../jwt/jwt.service.interface';
import { PasswordService } from '../password/password.service';
import { IPasswordService } from '../password/password.service.interface';
import { IUserService } from './user.service.interface';

export class UserService implements IUserService {
  constructor(
    private readonly passwordService: IPasswordService = new PasswordService(),
    private readonly jwtService: IJwtService = new JwtService()
  ) {}

  private async _findById(id: string): Promise<UserModel> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestError('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return prismaClient.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<UserModel[]> {
    return prismaClient.user.findMany();
  }

  async create(data: CreateUserInput): Promise<CreateUserOutput> {
    const { name, email, password } = data;

    const userExist = await this.findByEmail(email);

    if (userExist) {
      throw new BadRequestError('Usuário já existe');
    }

    const hashedPassword = await this.passwordService.hash(password);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        hashPassword: hashedPassword
      }
    });

    const { accessToken } = this.jwtService.sign({ email, id: user.id });

    return { user, accessToken };
  }

  async update(id: string, data: UpdateUserInput): Promise<UserModel> {
    const user = await this._findById(id);

    if (!user) {
      throw new BadRequestError('Usuário não encontrado');
    }

    return await prismaClient.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<UserModel> {
    const user = await this._findById(id);

    if (!user) {
      throw new BadRequestError('Usuário não encontrado');
    }

    const deletedUser = await prismaClient.user.delete({ where: { id } });

    return deletedUser;
  }
}
