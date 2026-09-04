import { CategoryTitleTag } from "@/components/category"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Category } from "@/models/category.model"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

interface ICategoryListProps {
  categories: Category[]
  className?: string
}

export function CategoryList({ categories, className }: ICategoryListProps) {
  return (
    <Card className={cn("w-full gap-0 pt-2 pb-0", className)}>
      <CardHeader className="border-b py-5">
        <CardTitle className="flex items-center justify-between gap-3">
          <h5 className="text-xs font-medium text-gray-500 uppercase">
            Categorias
          </h5>
          <Link
            className="text-ms flex items-center gap-1 text-brand-base"
            to="/categories"
          >
            Ver todas
            <ChevronRight className="text-brand-base" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-0 flex flex-col px-0">
        <div className="flex flex-col overflow-scroll">
          {categories.map(
            ({
              id,
              title,
              totalAmountTransactionsFormatted,
              colorCSS,
              countTransactions,
            }) => {
              return (
                <div
                  key={id}
                  className="flex items-center justify-between gap-10 border-b px-6 py-5"
                >
                  <CategoryTitleTag
                    title={title}
                    colorCSS={colorCSS}
                    className="mr-auto"
                  />

                  <span className="text-sm font-normal text-gray-600">
                    {countTransactions} itens
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {totalAmountTransactionsFormatted}
                  </span>
                </div>
              )
            }
          )}
        </div>
      </CardContent>
    </Card>
  )
}
