import {
  CircleArrowDown,
  CircleArrowUp,
  Wallet,
  type LucideProps,
} from "lucide-react"

export enum AmountTypeEnum {
  TOTAL = "TOTAL",
  IN = "IN",
  OUT = "OUT",
}

export const AMOUNT_TYPE_ICON_MAP: Record<
  AmountTypeEnum,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  [AmountTypeEnum.TOTAL]: Wallet,
  [AmountTypeEnum.IN]: CircleArrowUp,
  [AmountTypeEnum.OUT]: CircleArrowDown,
}

export const AMOUNT_TYPE_COLOR_MAP: Record<
  AmountTypeEnum,
  "purple-base" | "brand-base" | "red-base"
> = {
  [AmountTypeEnum.TOTAL]: "purple-base",
  [AmountTypeEnum.IN]: "brand-base",
  [AmountTypeEnum.OUT]: "red-base",
}
