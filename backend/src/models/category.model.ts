import { CategoryColorEnum, CategoryIconEnum } from '@/enums';

import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType
} from 'type-graphql';

registerEnumType(CategoryIconEnum, { name: 'CategoryIconEnum' });
registerEnumType(CategoryColorEnum, { name: 'CategoryColorEnum' });

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => CategoryIconEnum)
  icon!: CategoryIconEnum;

  @Field(() => CategoryColorEnum)
  color!: CategoryColorEnum;

  @Field(() => String) // Campo calculado, não armazenado
  hexColor!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
