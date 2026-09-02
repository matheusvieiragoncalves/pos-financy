import type { TransactionTypeEnum } from "@/enums"
import { formatMoney } from "@/utils/money-formatter"
import { Category } from "./category.model"
import { User } from "./user.model"

type TTransactionAttrs = {
  id: string
  amount: number
  description: string
  type: TransactionTypeEnum
  date: Date

  category: Category
  user: User

  createdAt: Date
  updatedAt: Date
}

export class Transaction {
  id!: string
  amount!: number
  description!: string
  type!: TransactionTypeEnum
  date!: Date

  category!: Category
  user!: User

  createdAt!: Date
  updatedAt!: Date

  get formattedAmount() {
    return formatMoney(this.amount)
  }

  constructor(attrs?: TTransactionAttrs) {
    Object.assign(this, attrs)

    this.user = new User(attrs?.user)
    this.category = new Category(attrs?.category) //TODO verificar depois
  }
}
