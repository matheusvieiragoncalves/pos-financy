import type { Category } from "@/models/category.model"

type TCategoryIconTagProps = Pick<Category, "color" | "Icon">

export function CategoryIconTag({ color, Icon }: TCategoryIconTagProps) {
  if (!Icon || !color) {
    return <></>
  }

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg ${color.bg}`}
    >
      <Icon className={`${color.text}`} />
    </div>
  )
}
