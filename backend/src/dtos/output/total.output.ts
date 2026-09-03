import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TransactionsTotalOutput {
  @Field(() => Number)
  totalIn!: number;

  @Field(() => Number)
  totalOut!: number;

  @Field(() => Number)
  total!: number;
}
