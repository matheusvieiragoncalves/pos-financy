import { Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async helloWorld(): Promise<String> {
    return 'Hello World';
  }
}
