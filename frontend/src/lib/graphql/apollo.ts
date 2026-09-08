import { useAuthStore } from "@/stores/auth"
import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
})

const authLink = new SetContextLink(({ headers }) => {
  const token = useAuthStore.getState().accessToken
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const errorLink = new ErrorLink(({ error }) => {
  // Erros retornados no corpo da resposta GraphQL (ex: extensions.code === "UNAUTHORIZED")
  if (CombinedGraphQLErrors.is(error)) {
    const isUnauthenticated = error.errors.some(
      (err) => err.extensions?.code === "UNAUTHORIZED"
    )

    if (isUnauthenticated && useAuthStore.getState().isAuthenticated) {
      useAuthStore.getState().logout()
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]), // Se atente a ordem dos links, authLink deve vir antes do httpLink para fornecer os headers de autenticação corretamente.
  cache: new InMemoryCache(),
})
