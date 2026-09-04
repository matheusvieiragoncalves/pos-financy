import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CategoryIconEnum } from "@/enums"
import {
  CATEGORY_COLOR_MAP,
  CategoryColorEnum,
} from "@/enums/category-color.enum"
import { CATEGORY_ICON_MAP } from "@/enums/category-icon.enum"
import type { Category } from "@/models/category.model"
import { useCategories } from "@/stores/categories"

interface ICreateCategoryDialogProps {
  open: boolean
  category?: Category | null
  onClose: () => void
}

export function CreateCategoryDialog({
  open,
  category,
  onClose,
}: ICreateCategoryDialogProps) {
  const createCategory = useCategories((state) => state.createCategory)
  const updateCategory = useCategories((state) => state.updateCategory)

  const [title, setTitle] = useState(category?.title ?? "")
  const [description, setDescription] = useState(category?.description ?? "")
  const [icon, setIcon] = useState<CategoryIconEnum>(
    category?.icon ?? CategoryIconEnum.BRIEFCASE_BUSINESS
  )

  const [color, setColor] = useState<CategoryColorEnum>(
    category?.color ?? CategoryColorEnum.GREEN
  )

  const isInvalidForm = useMemo(() => {
    return !title || !icon || !color
  }, [title, icon, color])

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    if (!title || !icon || !color) return

    if (category?.id) {
      updateCategory(category.id, { title, description, icon, color })
    } else {
      createCategory({ title, description, icon, color })
    }

    onCloseDialog()
  }

  function onCloseDialog() {
    setTitle("")
    setDescription("")
    setIcon(CategoryIconEnum.BRIEFCASE_BUSINESS)
    setColor(CategoryColorEnum.GREEN)
    onClose()
  }

  const iconOptions = Object.entries(CATEGORY_ICON_MAP).map(([key, value]) => ({
    Icon: value,
    value: key,
  }))

  const colorOptions = Object.entries(CATEGORY_COLOR_MAP).map(
    ([key, value]) => ({
      color: value.base,
      value: key,
    })
  )

  return (
    <Dialog open={open} onOpenChange={onCloseDialog}>
      <DialogContent className="w-md rounded-md p-6">
        <DialogHeader>
          <DialogTitle className="text-base leading-tight font-bold">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2">
          <FieldSet>
            <Field>
              <FieldLabel
                className="text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Título
              </FieldLabel>
              <Input
                id="title"
                placeholder="Ex. Alimentação"
                className="rounded-lg border-gray-300 bg-white py-6 text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel
                className="text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Descrição
              </FieldLabel>
              <Input
                id="description"
                placeholder="Descrição da categoria"
                className="rounded-lg border-gray-300 bg-white py-6 text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="text-xs text-gray-500">Opcional</span>
            </Field>

            <FieldGroup className="gap-3">
              <FieldLabel
                className="text-sm font-medium text-gray-700"
                htmlFor="icon"
              >
                Ícone
              </FieldLabel>
              <RadioGroup
                defaultValue={
                  category?.icon ?? CategoryIconEnum.BRIEFCASE_BUSINESS
                }
                className="grid flex-1 grid-cols-8 items-start"
                onValueChange={(value) => setIcon(value)}
              >
                {iconOptions.map(({ Icon, value }) => (
                  <FieldLabel
                    key={value}
                    htmlFor={value}
                    className="cursor-pointer rounded-lg border border-gray-300 p-2.5 transition-colors has-data-checked:border-brand-base has-data-checked:bg-white"
                  >
                    <RadioGroupItem
                      value={value}
                      id={value}
                      className="peer hidden"
                    />
                    <Icon className="size-5 text-gray-600 peer-data-checked:text-brand-base" />
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldGroup>

            <FieldGroup className="gap-3">
              <FieldLabel
                className="text-sm font-medium text-gray-700"
                htmlFor="color"
              >
                Cor
              </FieldLabel>
              <RadioGroup
                defaultValue={category?.color ?? CategoryColorEnum.GREEN}
                className="grid flex-1 grid-cols-7 items-start"
                onValueChange={(value) => setColor(value)}
              >
                {colorOptions.map(({ color, value }) => (
                  <FieldLabel
                    key={value}
                    htmlFor={value}
                    className={`h-7.5 w-full cursor-pointer rounded-lg border border-gray-300 p-1 transition-colors has-data-checked:border-brand-base has-data-checked:bg-white`}
                  >
                    <RadioGroupItem
                      value={value}
                      id={value}
                      className="peer hidden h-full w-full"
                    />
                    <div className={`h-full w-full rounded-sm bg-${color} `} />
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldGroup>

            <Button
              className="bg-brand-base py-6 text-base text-white hover:bg-brand-dark"
              type="submit"
              disabled={isInvalidForm}
            >
              Salvar
            </Button>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  )
}
