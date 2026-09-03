import { toast } from "@/components/ui/toast"
import { apolloClient } from "@/lib/graphql/apollo"
import { QUERY_FETCH_CATEGORIES } from "@/lib/graphql/queries"

import { Category } from "@/models/category.model"
import { enableMapSet } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type TCategoriesState = {
  categories: Map<string, Category>
  isLoading: boolean
  fetchCategories: () => void
}

enableMapSet()

export const useCategories = create<
  TCategoriesState,
  [["zustand/immer", never]]
>(
  immer((set) => {
    async function fetchCategories() {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.query({
          query: QUERY_FETCH_CATEGORIES,
        })

        if (!response?.data?.categories) {
          set((state) => {
            state.categories = new Map()
            state.isLoading = false
          })

          toast.add({ title: "Erro ao buscar categorias", type: "error" })
          return
        }

        set((state) => {
          response?.data?.categories.forEach((item) => {
            state.categories.set(item.id.toString(), new Category(item))
          })
          state.isLoading = false
        })
      } catch {
        set((state) => {
          state.categories = new Map()
          state.isLoading = false
        })

        toast.add({ title: "Erro ao buscar categorias", type: "error" })
      }
    }

    return {
      categories: new Map(),
      isLoading: false,
      fetchCategories,
    }
  })
)
