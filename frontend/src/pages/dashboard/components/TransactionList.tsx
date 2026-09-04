import { CategoryTitleTag } from "@/components/category"

import {
  TransactionAmount,
  TransactionCreateDialog,
  TransactionTitle,
} from "@/components/transaction"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/models/transaction.model"
import { ChevronRight, Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

interface ITransactionListProps {
  transactions: Transaction[]
  className?: string
}

export function TransactionList({
  transactions,
  className,
}: ITransactionListProps) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Card className={cn("w-full gap-0 pt-2 pb-0", className)}>
      <CardHeader className="border-b py-5">
        <CardTitle className="flex items-center justify-between gap-3">
          <h5 className="text-xs font-medium text-gray-500 uppercase">
            Transações recentes
          </h5>
          <Link
            className="text-ms flex items-center gap-1 text-brand-base"
            to="/transactions"
          >
            Ver todas
            <ChevronRight className="text-brand-base" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-0 flex flex-1 flex-col px-0">
        <div className="flex flex-col overflow-scroll">
          {transactions.map((item) => {
            const {
              description,
              formattedDate,
              type,
              formattedAmount,
              category: { colorCSS, Icon, title },
            } = item

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-10 border-b px-6 py-5"
              >
                <TransactionTitle
                  Icon={Icon}
                  colorCSS={colorCSS}
                  formattedDate={formattedDate}
                  description={description}
                  showDate
                />

                <CategoryTitleTag title={title} colorCSS={colorCSS} />

                <TransactionAmount
                  formattedAmount={formattedAmount}
                  type={type}
                />
              </div>
            )
          })}
        </div>
        <div className="mt-auto flex justify-center border-t px-6 py-5">
          <Button
            variant={"ghost"}
            className="text-sm text-brand-base"
            onClick={() => setOpenDialog(true)}
          >
            <Plus className="text-brand-base" />
            Nova transação
          </Button>
        </div>
      </CardContent>

      <TransactionCreateDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Card>
  )
}
