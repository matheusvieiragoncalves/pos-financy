import type { Transaction } from "@/models/transaction.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface IDeleteTransactionMutationData {
  transactionDelete: Transaction
  errors: Array<{ message: string }>
}

interface IDeleteTransactionMutationVariables {
  id: string
}

export const MUTATION_DELETE_TRANSACTION: TypedDocumentNode<
  IDeleteTransactionMutationData,
  IDeleteTransactionMutationVariables
> = gql`
  mutation DeleteTransaction($id: String!) {
    transactionDelete(id: $id) {
      id
    }
  }
`
