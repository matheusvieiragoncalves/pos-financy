import type { User } from "@/models/user.model"
import type { TUpdateUserParams } from "@/stores/auth"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface IUpdateUserMutationData {
  userUpdate: Pick<User, "name">
  errors: Array<{ message: string }>
}

interface IUpdateUserMutationVariables {
  data: TUpdateUserParams
}

export const MUTATION_UPDATE_USER: TypedDocumentNode<
  IUpdateUserMutationData,
  IUpdateUserMutationVariables
> = gql`
  mutation UserUpdate($data: UpdateUserInput!) {
    userUpdate(data: $data) {
      id
      name
      email
    }
  }
`
