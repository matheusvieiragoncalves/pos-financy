import { CategoryIconTag, CategoryTitleTag } from "@/components/category"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Category } from "@/models/category.model"
import { SquarePen, Trash } from "lucide-react"

interface ICategoryCardProps {
  category: Category
}

export function CategoryCard({
  category: { Icon, title, description, colorCSS },
}: ICategoryCardProps) {
  return (
    <Card className="flex flex-1 gap-5">
      <CardHeader className="flex items-center justify-between">
        <CategoryIconTag Icon={Icon} colorCSS={colorCSS} />
        <div className="flex gap-2">
          <Button className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-white">
            <Trash className="size-4 text-danger" />
          </Button>
          <Button className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-white">
            <SquarePen className="size-4 text-gray-700" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-base font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <CategoryTitleTag title={title} colorCSS={colorCSS} />
        <span className="text-sm text-gray-600">12 itens</span>
      </CardFooter>
    </Card>
  )
}
