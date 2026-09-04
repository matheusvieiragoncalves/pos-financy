import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export function PaginatedOutput<TItem extends object>(
  TItemClass: ClassType<TItem>
) {
  @ObjectType()
  abstract class PaginatedOutputClass {
    @Field(() => [TItemClass])
    items!: TItem[];

    @Field(() => Int)
    totalItems!: number;

    @Field(() => Int)
    currentPage!: number;

    @Field(() => Int)
    totalPages!: number;

    @Field(() => Int)
    perPage!: number;
  }

  return PaginatedOutputClass;
}
