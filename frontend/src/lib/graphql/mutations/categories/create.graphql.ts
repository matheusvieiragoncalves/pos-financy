import type { Category, TCategoryValueToCreate } from "@/models/category.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface ICreateCategoryMutationData {
  categoryCreate: Category
  errors: Array<{ message: string }>
}

interface ICreateCategoryMutationVariables {
  data: TCategoryValueToCreate
}

export const MUTATION_CREATE_CATEGORY: TypedDocumentNode<
  ICreateCategoryMutationData,
  ICreateCategoryMutationVariables
> = gql`
  mutation CategoryCreate($data: CreateCategoryInput!) {
    categoryCreate(data: $data) {
      id
      title
      description
      color
      icon
    }
  }
`
