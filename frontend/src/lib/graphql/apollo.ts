import { useAuthStore } from "@/stores/auth"
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

import { SetContextLink } from "@apollo/client/link/context"

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
})

const authLink = new SetContextLink(({ headers }) => {
  const token = useAuthStore.getState().token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]), // Se atente a ordem dos links, authLink deve vir antes do httpLink para fornecer os headers de autenticação corretamente.
  cache: new InMemoryCache(),
})
