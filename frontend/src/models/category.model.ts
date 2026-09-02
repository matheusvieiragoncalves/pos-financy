import { CategoryColorEnum, CategoryIconEnum } from "@/enums"
import { CATEGORY_COLOR_MAP } from "@/enums/category-color.enum"
import { CATEGORY_ICON_MAP } from "@/enums/category-icon.enum"
import { formatMoney } from "@/utils/money-formatter"
import type { LucideProps } from "lucide-react"

type TCategoryAttrs = {
  id?: string
  title?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
  icon?: CategoryIconEnum
  color?: CategoryColorEnum
  numberTransactions?: number
  totalAmountTransactions?: number
}

export class Category {
  id?: string
  title?: string
  description?: string
  numberTransactions?: number
  totalAmountTransactions?: number

  createdAt?: Date
  updatedAt?: Date

  private _icon!: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  private _color!: CategoryColorEnum

  get Icon() {
    return this._icon
  }

  get color(): { text: string; bg: string } {
    const color = CATEGORY_COLOR_MAP[this._color]
    return color
  }

  set icon(value: CategoryIconEnum) {
    this._icon = CATEGORY_ICON_MAP[value]
  }

  set color(value: CategoryColorEnum) {
    this._color = value
  }

  get totalAmountTransactionsFormatted() {
    return formatMoney(this.totalAmountTransactions ?? 0)
  }

  constructor(attrs?: TCategoryAttrs) {
    Object.assign(this, attrs)
  }
}
