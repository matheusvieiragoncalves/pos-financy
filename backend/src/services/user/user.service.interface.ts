import { CreateUserInput, UpdateUserInput } from '@/dtos/input/user.input';
import { CreateUserOutput } from '@/dtos/output/create-user.output';
import { UserModel } from '@/models/user.model';

export interface IUserService {
  findAll(): Promise<UserModel[]>;
  create(data: CreateUserInput): Promise<CreateUserOutput>;
  update(id: string, data: UpdateUserInput): Promise<UserModel>;
  delete(id: string): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | null>;
}
