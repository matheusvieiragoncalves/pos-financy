import type { IPagination } from "@/@types"
import { toast } from "@/components/ui/toast"
import { apolloClient } from "@/lib/graphql/apollo"
import { MUTATION_CREATE_TRANSACTION } from "@/lib/graphql/mutations/transaction"
import { QUERY_FETCH_TRANSACTIONS } from "@/lib/graphql/queries/transaction"
import {
  Transaction,
  type TTransactionValueToCreate,
} from "@/models/transaction.model"
import { enableMapSet } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type TPaginationMeta = Omit<IPagination<never>, "items">

type TTransactionsState = {
  totalIn: number
  totalOut: number
  total: number
  transactions: Map<string, Transaction>
  pagination: TPaginationMeta
  isLoading: boolean
  fetchTransactions: (page?: number) => Promise<void>
  createTransaction: (transaction: TTransactionValueToCreate) => Promise<void>
}

enableMapSet()

const DEFAULT_PAGINATION: TPaginationMeta = {
  currentPage: 1,
  perPage: 10,
  totalItems: 0,
  totalPages: 0,
}

export const useTransactions = create<
  TTransactionsState,
  [["zustand/immer", never]]
>(
  immer((set, get) => {
    async function fetchTransactions(page = 1) {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.query({
          query: QUERY_FETCH_TRANSACTIONS,
          variables: {
            pagination: { page, perPage: get().pagination.perPage },
          },
          fetchPolicy: "no-cache",
        })

        if (!response?.data?.transactions) {
          set((state) => {
            state.transactions = new Map()
            state.isLoading = false
          })

          toast.add({ title: "Erro ao buscar transações", type: "error" })
          return
        }

        const { items, totalItems, currentPage, totalPages, perPage } =
          response.data.transactions

        set((state) => {
          state.transactions.clear()

          items.forEach((item) => {
            state.transactions.set(item.id.toString(), new Transaction(item))
          })

          state.pagination = { currentPage, totalItems, totalPages, perPage }

          state.isLoading = false
          state.totalIn = response?.data?.transactionTotal?.totalIn ?? 0
          state.totalOut = response?.data?.transactionTotal?.totalOut ?? 0
          state.total = response?.data?.transactionTotal?.total ?? 0
        })
      } catch {
        set((state) => {
          state.transactions = new Map()
          state.isLoading = false
        })

        toast.add({ title: "Erro ao buscar transações", type: "error" })
      }
    }

    async function createTransaction(data: TTransactionValueToCreate) {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.mutate({
          mutation: MUTATION_CREATE_TRANSACTION,
          variables: { data },
        })

        if (!response?.data?.transactionCreate) {
          toast.add({ title: "Erro ao criar transação", type: "error" })
          return
        }

        await fetchTransactions()

        toast.add({ title: "Transação criada com sucesso", type: "success" })
      } catch {
        set((state) => {
          state.isLoading = false
        })

        toast.add({ title: "Erro ao criar transação", type: "error" })
      }
    }

    return {
      totalIn: 0,
      totalOut: 0,
      total: 0,
      transactions: new Map(),
      pagination: DEFAULT_PAGINATION,
      isLoading: false,
      fetchTransactions,
      createTransaction,
    }
  })
)
