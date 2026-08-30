import { TransactionTypeEnum } from '@/enums';
import { IsDate, IsEnum, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Number)
  amount!: number;

  @Field(() => TransactionTypeEnum)
  @IsEnum(TransactionTypeEnum)
  type!: TransactionTypeEnum;

  @Field(() => String)
  @IsString()
  @MaxLength(255)
  description?: string;

  @Field(() => Date)
  @IsDate()
  date!: Date;

  @Field(() => String)
  @IsString()
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => TransactionTypeEnum, { nullable: true })
  @IsEnum(TransactionTypeEnum)
  type?: TransactionTypeEnum;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(255)
  description?: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  date?: Date;

  @Field(() => String, { nullable: true })
  @IsString()
  categoryId?: string;
}
