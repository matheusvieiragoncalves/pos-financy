import type { Category } from "@/models/category.model"

type TCategoryIconTagProps = Pick<Category, "colorCSS" | "Icon">

export function CategoryIconTag({ colorCSS, Icon }: TCategoryIconTagProps) {
  if (!Icon || !colorCSS) {
    return <></>
  }

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorCSS.bg}`}
    >
      <Icon className={`${colorCSS.text}`} />
    </div>
  )
}
