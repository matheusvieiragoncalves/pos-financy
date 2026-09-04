import type {
  Transaction,
  TTransactionValueToCreate,
} from "@/models/transaction.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface ICreateTransactionMutationData {
  transactionCreate: Transaction
  errors: Array<{ message: string }>
}

interface ICreateTransactionMutationVariables {
  data: TTransactionValueToCreate
}

export const MUTATION_CREATE_TRANSACTION: TypedDocumentNode<
  ICreateTransactionMutationData,
  ICreateTransactionMutationVariables
> = gql`
  mutation TransactionCreate($data: CreateTransactionInput!) {
    transactionCreate(data: $data) {
      id
      amount
      date
      description
      user {
        id
        name
      }
      category {
        id
        icon
        color
        hexColor
        createdAt
      }
    }
  }
`
