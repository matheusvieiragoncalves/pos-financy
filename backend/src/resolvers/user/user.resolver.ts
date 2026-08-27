import { CreateUserInput, UpdateUserInput } from '@/dtos/input/user.input';
import { UserModel } from '@/models/user.model';
import { UserService } from '@/services/user/user.service';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  private readonly userService = new UserService();

  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserModel)
  async userCreate(
    @Arg('data', () => CreateUserInput) data: CreateUserInput
  ): Promise<UserModel> {
    return this.userService.create(data);
  }

  @Mutation(() => UserModel)
  async userUpdate(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput
  ): Promise<UserModel> {
    return this.userService.update(id, data);
  }

  @Mutation(() => UserModel)
  async userDelete(@Arg('id', () => String) id: string): Promise<UserModel> {
    return this.userService.delete(id);
  }
}
