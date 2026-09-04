import type { ILoginVariables } from "@/@types/auth/login.interface"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface ILoginMutationData {
  login: {
    accessToken: string
  }
  errors: Array<{ message: string }>
}

interface ILoginMutationVariables {
  data: ILoginVariables
}

export const MUTATION_LOGIN: TypedDocumentNode<
  ILoginMutationData,
  ILoginMutationVariables
> = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
    }
  }
`
