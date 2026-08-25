import { LoginInputDTO } from '@/dtos/input/auth.dto.ts';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(
    @Arg('data', () => LoginInputDTO) data: LoginInputDTO
  ): Promise<string> {
    console.log({ data });

    return 'Hello World';
  }
}
