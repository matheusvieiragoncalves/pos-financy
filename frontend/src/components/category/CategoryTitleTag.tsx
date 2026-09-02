import type { Category } from "@/models/category.model"

type TCategoryTitleTagProps = Pick<Category, "title" | "color">

export function CategoryTitleTag({ title, color }: TCategoryTitleTagProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${color.bg} ${color.text}`}
    >
      {title}
    </span>
  )
}
