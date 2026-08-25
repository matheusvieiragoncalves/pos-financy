import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInputDTO {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
