import { toast } from "@/components/ui/toast"
import { apolloClient } from "@/lib/graphql/apollo"
import { QUERY_FETCH_TRANSACTIONS } from "@/lib/graphql/queries/transaction"
import { Transaction } from "@/models/transaction.model"
import { enableMapSet } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type TLinksState = {
  transactions: Map<string, Transaction>
  isLoading: boolean
  fetchTransactions: () => void
}

enableMapSet()

export const useTransactions = create<TLinksState, [["zustand/immer", never]]>(
  immer((set) => {
    async function fetchTransactions() {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.query({
          query: QUERY_FETCH_TRANSACTIONS,
        })

        if (!response?.data?.transactions) {
          set((state) => {
            state.transactions = new Map()
            state.isLoading = false
          })

          toast.add({ title: "Erro ao buscar transações", type: "error" })
          return
        }

        set((state) => {
          response?.data?.transactions.forEach((item) => {
            state.transactions.set(item.id.toString(), new Transaction(item))
          })
          state.isLoading = false
        })
      } catch {
        set((state) => {
          state.transactions = new Map()
          state.isLoading = false
        })

        toast.add({ title: "Erro ao buscar transações", type: "error" })
      }
    }

    return {
      transactions: new Map(),
      isLoading: false,
      fetchTransactions,
    }
  })
)
