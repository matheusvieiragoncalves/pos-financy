import { TransactionModel } from '@/models/transaction.model';
import { ObjectType } from 'type-graphql';
import { PaginatedOutput } from './paginated.output';

@ObjectType()
export class TransactionPaginatedOutput extends PaginatedOutput(
  TransactionModel
) {}
