import { Button } from "@/components/ui/button"
import type { Category } from "@/models/category.model"
import { useCategories } from "@/stores/categories"
import { ArrowDownUp, Plus, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import { CategoryCard } from "./components/CategoryCard"
import { CategoryStatisticalCard } from "./components/CategoryStatisticalCard"
import { CreateCategoryDialog } from "./components/CreateCategoryDialog"
import { DeleteCategoryDialog } from "./components/DeleteCategoryDialog"

export function CategoriesPage() {
  const [categorySelected, setCategorySelected] = useState<Category | null>(
    null
  )

  const [openDialog, setOpenDialog] = useState(false)

  const [openDialogExclude, setOpenDialogExclude] = useState(false)

  function handleCreateCategory() {
    setCategorySelected(null)
    setOpenDialog(true)
  }

  function handleEditCategory(category: Category) {
    setCategorySelected(category)
    setOpenDialog(true)
  }

  function handleDeleteCategory(category: Category) {
    setCategorySelected(category)
    setOpenDialogExclude(true)
  }

  function handleCloseDialogs() {
    setCategorySelected(null)
    setOpenDialogExclude(false)
    setOpenDialog(false)
  }

  const categories = useCategories((state) => state.categories)
  const fetchCategories = useCategories((state) => state.fetchCategories)

  const categoryWithMostTransactions = useCategories(
    (state) => state.categoryWithMostTransactions
  )

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <div className="mt-12 flex w-full items-center justify-between">
        <div className="w-full">
          <h4 className="text-2xl font-bold text-gray-800">Categorias</h4>
          <h5 className="text-base text-gray-600">
            Organize suas transações por categorias
          </h5>
        </div>
        <Button
          className="flex bg-brand-base text-white"
          onClick={handleCreateCategory}
        >
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
          Icon={ArrowDownUp}
          iconColor="text-purple-base"
          value="10"
          subTitle="Total Categories"
        />

        <CategoryStatisticalCard
          Icon={categoryWithMostTransactions?.Icon || Tag}
          iconColor="text-blue-base"
          value={categoryWithMostTransactions?.title || ""}
          subTitle="categoria mais utilizada"
        />
      </div>

      <div className="mt-8 grid flex-1 grid-cols-4 items-start gap-4">
        {Array.from(categories.values()).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>

      <CreateCategoryDialog
        key={`create-or-edit-${categorySelected?.id}`}
        open={openDialog}
        onClose={handleCloseDialogs}
        category={categorySelected}
      />

      <DeleteCategoryDialog
        key={`delete-${categorySelected?.id}`}
        open={openDialogExclude}
        onClose={handleCloseDialogs}
        category={categorySelected as Category}
      />
    </div>
  )
}
