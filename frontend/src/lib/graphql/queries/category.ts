import type { Category } from "@/models/category.model"
import { gql, type TypedDocumentNode } from "@apollo/client"

interface IFindAllCategoriesQueryData {
  categories: Category[]
}

export const QUERY_FETCH_CATEGORIES: TypedDocumentNode<
  IFindAllCategoriesQueryData,
  void
> = gql`
  query FetchCategories {
    categories {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
    }
  }
`
