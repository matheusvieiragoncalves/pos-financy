import { CategoryColorEnum, CategoryIconEnum } from "@/enums"
import { CATEGORY_COLOR_MAP } from "@/enums/category-color.enum"
import { CATEGORY_ICON_MAP } from "@/enums/category-icon.enum"
import { formatMoney } from "@/utils/money-formatter"

type TCategoryAttrs = Omit<
  Category,
  "Icon" | "colorCSS" | "totalAmountTransactionsFormatted"
>

export type TCategoryValueToCreate = Pick<
  Category,
  "title" | "description" | "color" | "icon"
>

export class Category {
  id!: string
  title!: string
  description!: string
  totalAmountTransactions!: number
  countTransactions!: number
  color!: CategoryColorEnum
  icon!: CategoryIconEnum

  createdAt!: Date
  updatedAt!: Date

  get Icon() {
    return CATEGORY_ICON_MAP[this.icon]
  }

  get colorCSS(): { text: string; bg: string } {
    if (!this.color) {
      return { text: "text-gray-800", bg: "bg-gray-200" }
    }

    const color = CATEGORY_COLOR_MAP[this.color]
    return color
  }

  get totalAmountTransactionsFormatted() {
    return formatMoney(this.totalAmountTransactions ?? 0)
  }

  constructor(attrs?: TCategoryAttrs) {
    Object.assign(this, attrs)
  }
}
