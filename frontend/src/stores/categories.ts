import { toast } from "@/components/ui/toast"
import { apolloClient } from "@/lib/graphql/apollo"

import {
  MUTATION_CREATE_CATEGORY,
  MUTATION_UPDATE_CATEGORY,
} from "@/lib/graphql/mutations"

import { QUERY_FETCH_CATEGORIES } from "@/lib/graphql/queries"

import { Category, type TCategoryValueToCreate } from "@/models/category.model"
import { enableMapSet } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type TCategoriesState = {
  categories: Map<string, Category>
  isLoading: boolean
  fetchCategories: () => void
  createCategory: (data: TCategoryValueToCreate) => void
  updateCategory: (id: string, data: TCategoryValueToCreate) => void
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
          fetchPolicy: "no-cache",
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

    async function createCategory(data: TCategoryValueToCreate) {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.mutate({
          mutation: MUTATION_CREATE_CATEGORY,
          variables: { data },
        })

        if (!response?.data?.categoryCreate) {
          toast.add({ title: "Erro ao criar categoria", type: "error" })
          return
        }

        await fetchCategories()

        toast.add({ title: "Categoria criada com sucesso", type: "success" })
      } catch {
        set((state) => {
          state.isLoading = false
        })

        toast.add({ title: "Erro ao criar categoria", type: "error" })
      }
    }
    async function updateCategory(id: string, data: TCategoryValueToCreate) {
      set((state) => {
        state.isLoading = true
      })

      try {
        const response = await apolloClient.mutate({
          mutation: MUTATION_UPDATE_CATEGORY,
          variables: { id, data },
        })

        if (!response?.data?.categoryUpdate) {
          toast.add({ title: "Erro ao atualizar categoria", type: "error" })
          return
        }

        await fetchCategories()

        toast.add({
          title: "Categoria atualizada com sucesso",
          type: "success",
        })
      } catch {
        set((state) => {
          state.isLoading = false
        })

        toast.add({ title: "Erro ao atualizar categoria", type: "error" })
      }
    }

    return {
      categories: new Map(),
      isLoading: false,
      fetchCategories,
      createCategory,
      updateCategory,
    }
  })
)
