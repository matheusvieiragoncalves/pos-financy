import type { Category } from "@/models/category.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface IDeleteCategoryMutationData {
  categoryDelete: Category
  errors: Array<{ message: string }>
}

interface IDeleteCategoryMutationVariables {
  id: string
}

export const MUTATION_DELETE_CATEGORY: TypedDocumentNode<
  IDeleteCategoryMutationData,
  IDeleteCategoryMutationVariables
> = gql`
  mutation DeleteCategory($id: String!) {
    categoryDelete(id: $id) {
      id
    }
  }
`
