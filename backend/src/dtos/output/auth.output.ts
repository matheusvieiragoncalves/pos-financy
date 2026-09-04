import { UserModel } from '@/models/user.model';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginOutput {
  @Field(() => String)
  accessToken!: string;

  @Field(() => UserModel)
  user!: UserModel;
}
