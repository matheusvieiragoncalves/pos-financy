import type { Category } from "@/models/category.model"

type TCategoryTitleTagProps = Pick<Category, "title" | "colorCSS"> & {
  className?: string
}

export function CategoryTitleTag({
  title,
  colorCSS,
  className,
}: TCategoryTitleTagProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colorCSS.bg} ${colorCSS.text} ${className}`}
    >
      {title}
    </span>
  )
}
