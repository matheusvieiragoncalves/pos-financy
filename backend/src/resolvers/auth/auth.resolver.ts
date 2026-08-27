// backend/src/resolvers/auth/auth.resolver.ts
import { LoginInputDTO } from '@/dtos/input/auth.dto';
import { UnauthorizedError } from '@/errors/unauthorized-error';
import { PasswordService } from '@/services/password/password.service';
import { IPasswordService } from '@/services/password/password.service.interface';
import { UserService } from '@/services/user/user.service';
import { IUserService } from '@/services/user/user.service.interface';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: IUserService = new UserService(),
    private readonly passwordService: IPasswordService = new PasswordService()
  ) {}

  @Mutation(() => String)
  async login(
    @Arg('data', () => LoginInputDTO) data: LoginInputDTO
  ): Promise<string> {
    const { email, password } = data;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError();
    }

    const isValid = await this.passwordService.compare(
      password,
      user.hashPassword as string
    );

    if (!isValid) {
      throw new UnauthorizedError();
    }

    return 'Hello World'; // aqui depois entra a geração do JWT, por exemplo
  }
}
