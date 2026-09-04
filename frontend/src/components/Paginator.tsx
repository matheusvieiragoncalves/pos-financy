import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo } from "react"
import { Button } from "./ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination"

interface IPaginatorProps {
  currentPage: number
  totalPages: number
  onNavigateToPreviousPage: () => void
  onNavigateToNextPage: () => void
  onClickPage: (page: number) => void
}

export function Paginator({
  currentPage,
  totalPages,
  onNavigateToPreviousPage,
  onNavigateToNextPage,
  onClickPage,
}: IPaginatorProps) {
  const pages = useMemo(() => {
    if (!totalPages) return []

    if (totalPages === 1) return [currentPage]

    if (totalPages === 2) return [currentPage, currentPage + 1]

    if (totalPages === 3) return [currentPage, currentPage + 1, currentPage + 2]

    if (currentPage === 1)
      return [currentPage, currentPage + 1, currentPage + 2]

    if (currentPage === totalPages)
      return [currentPage - 2, currentPage - 1, currentPage]

    return [currentPage - 1, currentPage, currentPage + 1]
  }, [totalPages, currentPage])

  return (
    <Pagination>
      <PaginationContent>
        <Button
          onClick={() => onNavigateToPreviousPage()}
          className="flex size-8 items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="border-gray-300 text-gray-800" />
        </Button>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="flex size-8 items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100 data-active:bg-brand-base data-active:text-white"
              isActive={page === currentPage}
              onClick={() => onClickPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <Button
          onClick={() => onNavigateToNextPage()}
          className="flex size-8 items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="border-gray-300 text-gray-800" />
        </Button>
      </PaginationContent>
    </Pagination>
  )
}
