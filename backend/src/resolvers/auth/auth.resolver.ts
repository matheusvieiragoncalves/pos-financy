import { LoginInputDTO } from '@/dtos/input/auth.dto';
import { UnauthorizedError } from '@/errors/unauthorized-error';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(
    @Arg('data', () => LoginInputDTO) data: LoginInputDTO
  ): Promise<string> {
    const isValid = data.email && data.password; // sua lógica real aqui

    if (!isValid) {
      throw new UnauthorizedError();
    }

    return 'Hello World';
  }
}
