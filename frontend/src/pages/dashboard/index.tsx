import { AmountTypeEnum } from "@/enums/amount-type.enum"
import { Amount } from "@/models/amount.model"
import { useTransactions } from "@/stores/transactions"
import { useEffect } from "react"
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

  const transactions = useTransactions((state) => state.transactions)
  const fetchTransactions = useTransactions((state) => state.fetchTransactions)

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="grid flex-1 grid-cols-3 grid-rows-[auto_1fr] items-start gap-6">
      {amounts.map((item, index) => (
        <AmountCard key={index} amount={item} />
      ))}

      <TransactionList
        className="col-span-2"
        transactions={Array.from(transactions.values())}
      />

      {/* <CategoryList categories={[category]} /> */}
    </div>
  )
}
