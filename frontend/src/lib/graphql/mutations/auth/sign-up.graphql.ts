import type { ISignUpVariables } from "@/@types"
import type { User } from "@/models/user.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface ISignUpMutationData {
  userCreate: {
    user: User
    accessToken: string
  }
}

interface ISignUpMutationVariables {
  data: ISignUpVariables
}

export const MUTATION_SIGN_UP: TypedDocumentNode<
  ISignUpMutationData,
  ISignUpMutationVariables
> = gql`
  mutation UserCreate($data: CreateUserInput!) {
    userCreate(data: $data) {
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
      accessToken
    }
  }
`
