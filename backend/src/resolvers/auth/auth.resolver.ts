// backend/src/resolvers/auth/auth.resolver.ts
import { LoginInput } from '@/dtos/input/auth.input';
import { LoginOutput } from '@/dtos/output/auth.output';
import { UnauthorizedError } from '@/errors';

import { JwtService } from '@/services/jwt/jwt.service';
import { IJwtService } from '@/services/jwt/jwt.service.interface';
import { PasswordService } from '@/services/password/password.service';
import { IPasswordService } from '@/services/password/password.service.interface';
import { UserService } from '@/services/user/user.service';
import { IUserService } from '@/services/user/user.service.interface';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: IUserService = new UserService(),
    private readonly passwordService: IPasswordService = new PasswordService(),
    private readonly jwtService: IJwtService = new JwtService()
  ) {}

  @Mutation(() => LoginOutput)
  async login(
    @Arg('data', () => LoginInput) data: LoginInput
  ): Promise<LoginOutput> {
    const { email, password } = data;

    const user = await this.userService.findByEmail(email);

    if (!user || !user.hashPassword) {
      throw new UnauthorizedError();
    }

    const isValid = await this.passwordService.compare(
      password,
      user.hashPassword
    );

    if (!isValid) {
      throw new UnauthorizedError();
    }

    const { id } = user;

    return this.jwtService.sign({ id, email });
  }
}
