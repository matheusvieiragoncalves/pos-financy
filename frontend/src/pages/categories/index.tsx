import { Button } from "@/components/ui/button"
import { useCategories } from "@/stores/categories"
import { Plus, Tag } from "lucide-react"
import { useEffect } from "react"
import { CategoryCard } from "./components/CategoryCard"
import { CategoryStatisticalCard } from "./components/CategoryStatisticalCard"

export function CategoriesPage() {
  const categories = useCategories((state) => state.categories)
  const fetchCategories = useCategories((state) => state.fetchCategories)

  useEffect(() => {
    fetchCategories()
  }, [])

  console.log(categories)

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div className="w-full">
          <h4 className="text-2xl font-bold text-gray-800">Categorias</h4>
          <h5 className="text-base text-gray-600">
            Organize suas transações por categorias
          </h5>
        </div>
        <Button className="flex bg-brand-base text-white">
          <Plus /> Nova categoria
        </Button>
      </div>

      <div className="mt-8 flex gap-6">
        <CategoryStatisticalCard
          Icon={Tag}
          iconColor="text-gray-700"
          value="10"
          subTitle="Total Categories"
        />

        <CategoryStatisticalCard
          Icon={Tag}
          iconColor="text-gray-700"
          value="10"
          subTitle="Total Categories"
        />

        <CategoryStatisticalCard
          Icon={Tag}
          iconColor="text-gray-700"
          value="10"
          subTitle="Total Categories"
        />
      </div>

      <div className="mt-8 grid flex-1 grid-cols-4 items-start gap-4">
        {Array.from(categories.values()).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
