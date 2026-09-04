import type { ILoginVariables, ISignUpVariables } from "@/@types"
import { toast } from "@/components/ui/toast"
import { apolloClient } from "@/lib/graphql/apollo"
import {
  MUTATION_LOGIN,
  MUTATION_SIGN_UP,
  MUTATION_UPDATE_USER,
} from "@/lib/graphql/mutations"

import { User } from "@/models/user.model"
import { enableMapSet } from "immer"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { useCategories } from "./categories"
import { useTransactions } from "./transactions"

export type TUpdateUserParams = Pick<User, "name">

interface IAuthStore {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (data: ILoginVariables) => Promise<boolean>
  signUp: (data: ISignUpVariables) => Promise<boolean>
  logout: () => void
  updateUser: (data: TUpdateUserParams) => void
}

enableMapSet()

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => {
      async function login(data: ILoginVariables) {
        try {
          const response = await apolloClient.mutate({
            mutation: MUTATION_LOGIN,
            variables: { data },
          })

          if (response.data?.login) {
            const { accessToken, user } = response.data.login

            set((state) => {
              state.user = new User(user)
              state.accessToken = accessToken
              state.isAuthenticated = true
            })

            return true
          }

          return false
        } catch (error) {
          console.log("Erro ao fazer login:", error)
          throw error
        }
      }

      async function signUp(data: ISignUpVariables) {
        try {
          const response = await apolloClient.mutate({
            mutation: MUTATION_SIGN_UP,
            variables: { data },
          })

          if (response.data?.userCreate) {
            const { id, name, email } = response.data.userCreate.user
            const { accessToken } = response.data.userCreate

            const user = new User({ id, name, email })

            set((state) => {
              state.user = user
              state.accessToken = accessToken
              state.isAuthenticated = true
            })

            return true
          }

          return false
        } catch (error) {
          console.log("Erro ao ao registrar usuário:", error)
          throw error
        }
      }

      async function updateUser(data: TUpdateUserParams) {
        try {
          const response = await apolloClient.mutate({
            mutation: MUTATION_UPDATE_USER,
            variables: { data },
          })

          if (!response.data?.userUpdate) {
            toast.add({
              title: "Erro",
              description: "Não foi possível atualizar o usuário.",
              type: "error",
            })

            return
          }

          const { name } = response.data.userUpdate

          set((state) => {
            state.user = new User({ ...state.user, name })
          })

          toast.add({
            title: "Sucesso",
            description: "Usuário atualizado com sucesso.",
            type: "success",
          })
        } catch (error) {
          toast.add({
            title: "Erro",
            description: "Não foi possível atualizar o usuário.",
            type: "error",
          })
          throw error
        }
      }

      function logout() {
        set((state) => {
          state.user = null
          state.accessToken = null
          state.isAuthenticated = false
        })

        useCategories.getState().reset()
        useTransactions.getState().reset()

        apolloClient.clearStore()
      }

      return {
        user: null,
        accessToken: null,
        isAuthenticated: false,
        logout,
        signUp,
        login,
        updateUser,
      }
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          state.user = new User(state.user)
        }
      },
    }
  )
)
