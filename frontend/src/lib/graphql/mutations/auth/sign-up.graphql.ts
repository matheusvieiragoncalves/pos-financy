import type { ISignUpVariables } from "@/@types"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface ISignUpMutationData {
  userCreate: {
    id: string
    name: string
    email: string
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
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`
