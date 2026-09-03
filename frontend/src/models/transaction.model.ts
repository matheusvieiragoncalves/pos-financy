import type { TransactionTypeEnum } from "@/enums"
import { formatMoney } from "@/utils/money-formatter"
import { Category } from "./category.model"
import { User } from "./user.model"

type TTransactionAttrs = Omit<Transaction, "formattedAmount" | "formattedDate">

export type TTransactionValueToCreate = Omit<
  Transaction,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "category"
  | "formattedAmount"
  | "formattedDate"
  | "user"
> & {
  categoryId: string
}

export class Transaction {
  id!: string
  amount!: number
  description!: string
  type!: TransactionTypeEnum
  date!: Date | string

  category!: Category
  user!: User

  createdAt!: Date
  updatedAt!: Date

  get formattedAmount() {
    return formatMoney(this.amount)
  }

  get formattedDate() {
    return this.date instanceof Date
      ? this.date.toLocaleDateString()
      : this.date
  }

  constructor(attrs?: TTransactionAttrs) {
    Object.assign(this, attrs)

    this.user = new User(attrs?.user)
    this.category = new Category(attrs?.category)

    if (attrs?.date) {
      this.date =
        attrs?.date instanceof Date ? attrs?.date : new Date(attrs?.date)
    }
  }
}
