import type {
  Transaction,
  TTransactionValueToCreate,
} from "@/models/transaction.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface IUpdateTransactionMutationData {
  transactionUpdate: Transaction
  errors: Array<{ message: string }>
}

interface IUpdateTransactionMutationVariables {
  id: string
  data: TTransactionValueToCreate
}
export const MUTATION_UPDATE_TRANSACTION: TypedDocumentNode<
  IUpdateTransactionMutationData,
  IUpdateTransactionMutationVariables
> = gql`
  mutation TransactionUpdate($id: String!, $data: UpdateTransactionInput!) {
    transactionUpdate(id: $id, data: $data) {
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
