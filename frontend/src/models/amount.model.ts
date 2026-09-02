import {
  AMOUNT_TYPE_COLOR_MAP,
  AMOUNT_TYPE_ICON_MAP,
  type AmountTypeEnum,
} from "@/enums/amount-type.enum"
import { formatMoney } from "@/utils/money-formatter"
import type { LucideProps } from "lucide-react"

type TAmountAttrs = Pick<Amount, "title" | "amount" | "type">

export class Amount {
  title!: string
  amount!: number
  type!: AmountTypeEnum

  private _icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >

  private _color!: "purple-base" | "brand-base" | "red-base"

  get Icon() {
    return this._icon
  }

  get color() {
    return this._color
  }

  get formattedAmount() {
    return formatMoney(this.amount)
  }

  constructor(attrs?: TAmountAttrs) {
    Object.assign(this, attrs)

    this._icon = AMOUNT_TYPE_ICON_MAP[this.type]
    this._color = AMOUNT_TYPE_COLOR_MAP[this.type]
  }
}
