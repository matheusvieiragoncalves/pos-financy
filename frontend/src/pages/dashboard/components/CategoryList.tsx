import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Category } from "@/models/category.model"
import { Link } from "react-router-dom"

interface ICategoryListProps {
  categories: Category[]
  className?: string
}

export function CategoryList({ categories, className }: ICategoryListProps) {
  return (
    <Card className={cn("w-full gap-4", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <h5 className="text-xs font-medium text-gray-500 uppercase">
            Transações recentes
          </h5>
          <Link to="/transactions">Ver todas</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categories.map((item) => (
          <div key={item.id}>
            {/* <TransactionTitle transaction={item} showDate /> */}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
