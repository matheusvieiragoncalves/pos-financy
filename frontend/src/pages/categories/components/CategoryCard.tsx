import { CategoryIconTag, CategoryTitleTag } from "@/components/category"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Category } from "@/models/category.model"
import { SquarePen, Trash } from "lucide-react"

interface ICategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: ICategoryCardProps) {
  return (
    <Card className="flex h-full flex-1 gap-5">
      <CardHeader className="flex items-center justify-between">
        <CategoryIconTag Icon={category.Icon} colorCSS={category.colorCSS} />
        <div className="flex gap-2">
          <Button
            className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-white"
            onClick={() => onDelete(category)}
          >
            <Trash className="size-4 text-danger" />
          </Button>
          <Button
            className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-white"
            onClick={() => onEdit(category)}
          >
            <SquarePen className="size-4 text-gray-700" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-2">
        <p className="text-base font-semibold text-gray-800">
          {category.title}
        </p>
        <p className="text-sm text-gray-600">{category.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <CategoryTitleTag title={category.title} colorCSS={category.colorCSS} />
        <span className="text-sm text-gray-600">12 itens</span>
      </CardFooter>
    </Card>
  )
}
