import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Plus, SquarePen, Trash } from "lucide-react"
import { useEffect, useState } from "react"

import { CategoryIconTag, CategoryTitleTag } from "@/components/category"
import { Paginator } from "@/components/Paginator"

import {
  TransactionCreateDialog,
  TransactionDeleteDialog,
  TransactionFilters,
  TransactionType,
} from "@/components/transaction"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Transaction } from "@/models/transaction.model"
import { useCategories } from "@/stores/categories"
import { useTransactions } from "@/stores/transactions"

export function TransactionsPage() {
  const [transactionSelected, setTransactionSelected] =
    useState<Transaction | null>(null)

  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogExclude, setOpenDialogExclude] = useState(false)

  const transactions = useTransactions((state) => state.transactions)
  const { currentPage, perPage, totalItems, totalPages } = useTransactions(
    (state) => state.pagination
  )

  const fetchTransactions = useTransactions((state) => state.fetchTransactions)

  const categories = useCategories((state) => state.categories)
  const fetchCategories = useCategories((state) => state.fetchCategories)

  function handleCreateTransaction() {
    setTransactionSelected(null)
    setOpenDialog(true)
  }

  function handleEditTransaction(transaction: Transaction) {
    setTransactionSelected(transaction)
    setOpenDialog(true)
  }

  function handleDeleteTransaction(transaction: Transaction) {
    setTransactionSelected(transaction)
    setOpenDialogExclude(true)
  }

  function handleCloseDialogs() {
    setTransactionSelected(null)
    setOpenDialogExclude(false)
    setOpenDialog(false)
  }

  function handlePageChange(page: number) {
    if (page === currentPage) return
    fetchTransactions({ page })
  }

  function handleNavigateToPreviousPage() {
    if (currentPage <= 1) return
    fetchTransactions({ page: currentPage - 1 })
  }

  function handleNavigateToNextPage() {
    if (currentPage >= totalPages) return
    fetchTransactions({ page: currentPage + 1 })
  }

  useEffect(() => {
    if (!transactions || transactions.size === 0 || perPage !== 10) {
      fetchTransactions({ perPage: 10 })
    }

    if (!categories || categories.size === 0) {
      fetchCategories()
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="mt-12 flex w-full items-center justify-between">
        <div className="w-full">
          <h4 className="text-2xl font-bold text-gray-800">Transações</h4>
          <h5 className="text-base text-gray-600">
            Gerencie todas as suas transações financeiras
          </h5>
        </div>
        <Button
          className="flex bg-brand-base text-white hover:bg-brand-dark"
          onClick={handleCreateTransaction}
        >
          <Plus /> Nova transação
        </Button>
      </div>

      <TransactionFilters />

      <Card className="gap-0 p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-5 text-left text-xs text-gray-500 uppercase">
                  Descrição
                </TableHead>
                <TableHead className="px-6 py-5 text-center text-xs text-gray-500 uppercase">
                  Data
                </TableHead>
                <TableHead className="px-6 py-5 text-center text-xs text-gray-500 uppercase">
                  Categoria
                </TableHead>
                <TableHead className="px-6 py-5 text-center text-xs text-gray-500 uppercase">
                  Tipo
                </TableHead>
                <TableHead className="px-6 py-5 text-center text-xs text-gray-500 uppercase">
                  Valor
                </TableHead>
                <TableHead className="px-6 py-5 text-right text-xs text-gray-500 uppercase">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from(transactions.values()).map((transaction) => {
                const {
                  description,
                  id,
                  formattedDate,
                  type,
                  formattedAmount,
                  category: { colorCSS, Icon, title },
                } = transaction

                return (
                  <TableRow key={id}>
                    <TableCell className="flex min-w-[30vw] items-center gap-4 px-6 py-4 text-left text-sm text-gray-800">
                      <CategoryIconTag Icon={Icon} colorCSS={colorCSS} />
                      {description}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-sm text-gray-600">
                      {formattedDate}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <CategoryTitleTag colorCSS={colorCSS} title={title} />
                    </TableCell>
                    <TableCell className="flex justify-center px-6 py-4 text-center">
                      <TransactionType type={type} />
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                      {formattedAmount}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2 p-5 text-right">
                      <Button
                        className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-white"
                        onClick={() => handleDeleteTransaction(transaction)}
                      >
                        <Trash className="size-4 text-danger" />
                      </Button>
                      <Button
                        className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-white"
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        <SquarePen className="size-4 text-gray-700" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-200 px-6 py-5">
          <span className="text-sm text-gray-700">
            {`${(currentPage - 1) * perPage + 1} a ${currentPage === totalPages ? totalItems : perPage * currentPage} | ${totalItems} resultados`}
          </span>
          <div>
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onClickPage={handlePageChange}
              onNavigateToPreviousPage={handleNavigateToPreviousPage}
              onNavigateToNextPage={handleNavigateToNextPage}
            />
          </div>
        </CardFooter>
      </Card>

      <TransactionCreateDialog
        key={`create-or-edit-${transactionSelected?.id}`}
        open={openDialog}
        onClose={handleCloseDialogs}
        transaction={transactionSelected}
      />

      <TransactionDeleteDialog
        key={`delete-${transactionSelected?.id}`}
        onClose={handleCloseDialogs}
        open={openDialogExclude}
        transaction={transactionSelected as Transaction}
      />
    </div>
  )
}
