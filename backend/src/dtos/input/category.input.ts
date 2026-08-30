import { CategoryColorEnum, CategoryIconEnum } from '@/enums';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsString()
  @MaxLength(50)
  title!: string;

  @Field(() => String)
  @IsString()
  description!: string;

  @Field(() => CategoryIconEnum)
  @IsEnum(CategoryIconEnum)
  icon!: CategoryIconEnum;

  @Field(() => CategoryColorEnum)
  @IsEnum(CategoryColorEnum)
  color!: CategoryColorEnum;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(50)
  title?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;

  @Field(() => CategoryIconEnum, { nullable: true })
  @IsEnum(CategoryIconEnum)
  icon?: CategoryIconEnum;

  @Field(() => CategoryColorEnum, { nullable: true })
  @IsEnum(CategoryColorEnum)
  color?: CategoryColorEnum;
}
