export interface IPagination<T> {
  items: T[]
  totalItems: number
  currentPage: number
  totalPages: number
  perPage: number
}
