import type { Category, TCategoryValueToCreate } from "@/models/category.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface IUpdateCategoryMutationData {
  categoryUpdate: Category
  errors: Array<{ message: string }>
}

interface IUpdateCategoryMutationVariables {
  id: string
  data: TCategoryValueToCreate
}

export const MUTATION_UPDATE_CATEGORY: TypedDocumentNode<
  IUpdateCategoryMutationData,
  IUpdateCategoryMutationVariables
> = gql`
  mutation CategoryUpdate($id: String!, $data: UpdateCategoryInput!) {
    categoryUpdate(id: $id, data: $data) {
      id
      title
      description
      color
      icon
    }
  }
`
