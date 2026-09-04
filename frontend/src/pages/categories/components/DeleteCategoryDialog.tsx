import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type { Category } from "@/models/category.model"
import { useCategories } from "@/stores/categories"

interface IDeleteCategoryDialogProps {
  open: boolean
  category: Category
  onClose: () => void
}

export function DeleteCategoryDialog({
  open,
  category,
  onClose,
}: IDeleteCategoryDialogProps) {
  const deleteCategory = useCategories((state) => state.deleteCategory)

  function handleDeleteCategory() {
    console.log(`Deleted category with id: ${category.id}`)
    deleteCategory(category.id)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-md rounded-md p-6" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-base leading-tight">
            Realmente deseja excluir a categoria <b>"{category?.title}"</b>?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-gray-400 px-4 py-2 text-sm text-white hover:bg-gray-600"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            className="bg-danger px-4 py-2 text-sm text-white hover:bg-red-dark"
            type="button"
            onClick={handleDeleteCategory}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
