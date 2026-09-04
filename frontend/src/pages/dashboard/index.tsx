import { AmountTypeEnum } from "@/enums/amount-type.enum"
import { Amount } from "@/models/amount.model"
import { useCategories } from "@/stores/categories"
import { useTransactions } from "@/stores/transactions"
import { useEffect } from "react"
import { AmountCard } from "./components/AmountCard"
import { CategoryList } from "./components/CategoryList"
import { TransactionList } from "./components/TransactionList"

export function DashboardPage() {
  const perPage = useTransactions((state) => state.pagination.perPage)

  const transactions = useTransactions((state) => state.transactions)
  const fetchTransactions = useTransactions((state) => state.fetchTransactions)

  const totalIn = useTransactions((state) => state.totalIn)
  const totalOut = useTransactions((state) => state.totalOut)
  const total = useTransactions((state) => state.total)

  const categories = useCategories((state) => state.categories)
  const fetchCategories = useCategories((state) => state.fetchCategories)

  useEffect(() => {
    if (!transactions || transactions.size === 0 || perPage !== 5) {
      fetchTransactions({ perPage: 5 })
    }

    if (!categories || categories.size === 0) {
      fetchCategories()
    }
  }, [])

  return (
    <div className="grid flex-1 grid-cols-3 grid-rows-[auto_1fr] items-start gap-6">
      <AmountCard
        amount={
          new Amount({
            amount: total,
            title: "Saldo total",
            type: AmountTypeEnum.TOTAL,
          })
        }
      />
      <AmountCard
        amount={
          new Amount({
            amount: totalIn,
            title: "Receitas do mês",
            type: AmountTypeEnum.IN,
          })
        }
      />
      <AmountCard
        amount={
          new Amount({
            amount: totalOut,
            title: "Despesas do mês",
            type: AmountTypeEnum.OUT,
          })
        }
      />

      <TransactionList
        className="col-span-2"
        transactions={Array.from(transactions.values())}
      />

      <CategoryList categories={Array.from(categories.values())} />
    </div>
  )
}
