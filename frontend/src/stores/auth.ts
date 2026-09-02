import type { ILoginVariables, ISignUpVariables } from "@/@types"
import { apolloClient } from "@/lib/graphql/apollo"
import { MUTATION_LOGIN, MUTATION_SIGN_UP } from "@/lib/graphql/mutations"

import { User } from "@/models/user.model"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IAuthStore {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  signUp: (data: ISignUpVariables) => Promise<boolean>
  login: (data: ILoginVariables) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      signUp: async (data: ISignUpVariables) => {
        try {
          const response = await apolloClient.mutate({
            mutation: MUTATION_SIGN_UP,
            variables: { data },
          })

          if (response.data?.userCreate) {
            const { id, name, email } = response.data.userCreate

            const user = new User({ id, name, email })

            set({ user, accessToken: null, isAuthenticated: true })

            return true
          }

          return false
        } catch (error) {
          console.log("Erro ao ao registrar usuário:", error)
          throw error
        }
      },
      login: async (data: ILoginVariables) => {
        try {
          const response = await apolloClient.mutate({
            mutation: MUTATION_LOGIN,
            variables: { data },
          })

          if (response.data?.login) {
            const { accessToken } = response.data.login

            set({ user: null, accessToken, isAuthenticated: true })

            return true
          }

          return false
        } catch (error) {
          console.log("Erro ao fazer login:", error)
          throw error
        }
      },
      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false })
        apolloClient.clearStore() // Limpa o cache do Apollo Client ao fazer logout
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
