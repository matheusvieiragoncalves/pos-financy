import {
  CategoryColorEnum,
  CategoryIconEnum,
  TransactionTypeEnum,
} from "@/enums"
import { AmountTypeEnum } from "@/enums/amount-type.enum"
import { Amount } from "@/models/amount.model"
import { Category } from "@/models/category.model"
import { Transaction } from "@/models/transaction.model"
import { User } from "@/models/user.model"
import { AmountCard } from "./components/AmountCard"
import { TransactionList } from "./components/TransactionList"

export function DashboardPage() {
  const amounts: Amount[] = [
    new Amount({
      amount: 1000,
      type: AmountTypeEnum.TOTAL,
      title: "Saldo total",
    }),
    new Amount({
      amount: 1000,
      type: AmountTypeEnum.IN,
      title: "Receitas do mês",
    }),
    new Amount({
      amount: 1000,
      type: AmountTypeEnum.OUT,
      title: "Despesas do mês",
    }),
  ]

  const category = new Category({
    id: "cat1",
    title: "Alimentação",
    color: CategoryColorEnum.BLUE,
    description: "Categoria de alimentação",
    createdAt: new Date(),
    updatedAt: new Date(),
    icon: CategoryIconEnum.BAGGAGE_CLAIM,
  })

  const user: User = new User({
    id: "user1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const transactionList: Transaction[] = Array(4).fill(
    new Transaction({
      id: "aaa",
      description: "Compra no supermercado",
      amount: 200,
      type: TransactionTypeEnum.OUT,
      date: new Date(),
      category: category,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: user,
    })
  )

  return (
    <div className="grid h-[88vh] flex-1 grid-cols-3 grid-rows-[auto_1fr] gap-6">
      {amounts.map((item, index) => (
        <AmountCard key={index} amount={item} />
      ))}

      <TransactionList className="col-span-2" transactions={transactionList} />

      {/* <CategoryList categories={transactionList} /> */}
    </div>
  )
}
