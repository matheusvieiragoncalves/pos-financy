import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  type LucideProps,
} from "lucide-react"

export enum CategoryIconEnum {
  BRIEFCASE_BUSINESS = "BRIEFCASE_BUSINESS",
  CAR_FRONT = "CAR_FRONT",
  HEART_PULSE = "HEART_PULSE",
  PIGGY_BANK = "PIGGY_BANK",
  SHOPPING_CART = "SHOPPING_CART",
  TICKET = "TICKET",
  TOOL_CASE = "TOOL_CASE",
  UTENSILS = "UTENSILS",
  PAW_PRINT = "PAW_PRINT",
  HOUSE = "HOUSE",
  GIFT = "GIFT",
  DUMBBELL = "DUMBBELL",
  BOOK_OPEN = "BOOK_OPEN",
  BAGGAGE_CLAIM = "BAGGAGE_CLAIM",
  MAILBOX = "MAILBOX",
  RECEIPT_TEXT = "RECEIPT_TEXT",
}

export const CATEGORY_ICON_MAP: Record<
  CategoryIconEnum,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  [CategoryIconEnum.BAGGAGE_CLAIM]: BaggageClaim,
  [CategoryIconEnum.BRIEFCASE_BUSINESS]: BriefcaseBusiness,
  [CategoryIconEnum.CAR_FRONT]: CarFront,
  [CategoryIconEnum.HEART_PULSE]: HeartPulse,
  [CategoryIconEnum.PIGGY_BANK]: PiggyBank,
  [CategoryIconEnum.SHOPPING_CART]: ShoppingCart,
  [CategoryIconEnum.TICKET]: Ticket,
  [CategoryIconEnum.TOOL_CASE]: ToolCase,
  [CategoryIconEnum.UTENSILS]: Utensils,
  [CategoryIconEnum.PAW_PRINT]: PawPrint,
  [CategoryIconEnum.HOUSE]: House,
  [CategoryIconEnum.GIFT]: Gift,
  [CategoryIconEnum.DUMBBELL]: Dumbbell,
  [CategoryIconEnum.BOOK_OPEN]: BookOpen,
  [CategoryIconEnum.MAILBOX]: Mailbox,
  [CategoryIconEnum.RECEIPT_TEXT]: ReceiptText,
}
