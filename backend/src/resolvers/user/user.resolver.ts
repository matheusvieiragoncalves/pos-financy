import { Public } from '@/decorators/public.decorator';
import { CreateUserInput, UpdateUserInput } from '@/dtos/input/user.input';
import { isAuthenticated } from '@/middlewares/auth.middleware';
import { UserModel } from '@/models/user.model';
import { UserService } from '@/services/user/user.service';
import { IUserService } from '@/services/user/user.service.interface';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
@UseMiddleware(isAuthenticated)
export class UserResolver {
  constructor(private readonly userService: IUserService = new UserService()) {}

  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Public()
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
