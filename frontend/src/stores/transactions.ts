import type { IPagination } from "@/@types"
import { toast } from "@/components/ui/toast"
import { apolloClient } from "@/lib/graphql/apollo"
import { MUTATION_CREATE_TRANSACTION } from "@/lib/graphql/mutations/transaction/create.graphql"
import { MUTATION_DELETE_TRANSACTION } from "@/lib/graphql/mutations/transaction/delete.graphql"

import { MUTATION_UPDATE_TRANSACTION } from "@/lib/graphql/mutations/transaction/update.graphql"
import { QUERY_FETCH_TRANSACTIONS } from "@/lib/graphql/queries/transaction"
import {
  Transaction,
  type TTransactionValueToCreate,
} from "@/models/transaction.model"
import { enableMapSet } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type TPaginationMeta = Omit<IPagination<never>, "items">

type TPaginationOptions = {
  page?: number
  perPage?: number
}

type TTransactionsState = {
  totalIn: number
  totalOut: number
  total: number
  transactions: Map<string, Transaction>
  pagination: TPaginationMeta
  isLoading: boolean
  fetchTransactions: (options?: TPaginationOptions) => Promise<void>
  createTransaction: (transaction: TTransactionValueToCreate) => Promise<void>
  updateTransaction: (
    id: string,
    transaction: TTransactionValueToCreate
  ) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
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
    async function fetchTransactions(options?: TPaginationOptions) {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.query({
          query: QUERY_FETCH_TRANSACTIONS,
          variables: {
            pagination: {
              page: options?.page ?? 1,
              perPage: options?.perPage ?? get().pagination.perPage,
            },
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

    async function updateTransaction(
      id: string,
      data: TTransactionValueToCreate
    ) {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.mutate({
          mutation: MUTATION_UPDATE_TRANSACTION,
          variables: { id, data },
        })

        if (!response?.data?.transactionUpdate) {
          toast.add({ title: "Erro ao atualizar transação", type: "error" })
          return
        }

        await fetchTransactions()

        toast.add({
          title: "Transação atualizada com sucesso",
          type: "success",
        })
      } catch {
        set((state) => {
          state.isLoading = false
        })

        toast.add({ title: "Erro ao atualizar transação", type: "error" })
      }
    }

    async function deleteTransaction(id: string) {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.mutate({
          mutation: MUTATION_DELETE_TRANSACTION,
          variables: { id },
          fetchPolicy: "no-cache",
        })

        if (!response?.data?.transactionDelete) {
          toast.add({ title: "Erro ao excluir transação", type: "error" })
          return
        }

        await fetchTransactions()

        toast.add({ title: "Transação excluída com sucesso", type: "success" })
      } catch (err) {
        set((state) => {
          state.isLoading = false
        })

        let message = "Erro ao excluir transação"

        if (err instanceof Error) {
          message = err.message
        }

        toast.add({ title: message, type: "error" })
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
      updateTransaction,
      deleteTransaction,
    }
  })
)
