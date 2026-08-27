import { CreateUserInput, UpdateUserInput } from '@/dtos/input/user.input';
import { UserModel } from '@/models/user.model';

export interface IUserService {
  findAll(): Promise<UserModel[]>;
  create(data: CreateUserInput): Promise<UserModel>;
  update(id: string, data: UpdateUserInput): Promise<UserModel>;
  delete(id: string): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | null>;
}
