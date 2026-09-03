import type { Transaction } from "@/models/transaction.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface IFindAllTransactionsQueryData {
  transactions: Transaction[]
  transactionTotal: {
    totalIn: number
    totalOut: number
    total: number
  }
}

export const QUERY_FETCH_TRANSACTIONS: TypedDocumentNode<
  IFindAllTransactionsQueryData,
  void
> = gql`
  query FetchTransactions {
    transactions {
      id
      amount
      description
      date
      type

      category {
        id
        title
        color
        icon
      }

      createdAt
      updatedAt
    }
    transactionTotal {
      totalIn
      totalOut
      total
    }
  }
`
