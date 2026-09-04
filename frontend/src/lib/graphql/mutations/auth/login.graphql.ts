import type { ILoginVariables } from "@/@types/auth/login.interface"
import type { User } from "@/models/user.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface ILoginMutationData {
  login: {
    accessToken: string
    user: Pick<User, "name" | "email">
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
      user {
        id
        name
        email
      }
    }
  }
`
