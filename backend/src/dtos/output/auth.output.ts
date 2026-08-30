import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginOutput {
  @Field(() => String)
  accessToken!: string;
}
