import { TransactionTypeEnum } from '@/enums';

import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType
} from 'type-graphql';
import { CategoryModel } from './category.model';
import { UserModel } from './user.model';

registerEnumType(TransactionTypeEnum, { name: 'TransactionTypeEnum' });

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => Number)
  amount!: number;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => TransactionTypeEnum)
  type!: TransactionTypeEnum;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => String)
  categoryId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
