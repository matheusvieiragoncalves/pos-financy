import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type { Transaction } from "@/models/transaction.model"
import { useTransactions } from "@/stores/transactions"

interface ITransactionDeleteDialogProps {
  open: boolean
  transaction: Transaction
  onClose: () => void
}

export function TransactionDeleteDialog({
  open,
  transaction,
  onClose,
}: ITransactionDeleteDialogProps) {
  const deleteTransaction = useTransactions((state) => state.deleteTransaction)

  function handleDeleteTransaction() {
    deleteTransaction(transaction.id)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-md rounded-md p-6" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-base leading-tight">
            Realmente deseja excluir a transação{" "}
            <b>"{transaction?.description}"</b>?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-gray-400 px-4 py-2 text-sm text-white hover:bg-gray-600"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            className="bg-danger px-4 py-2 text-sm text-white hover:bg-red-dark"
            type="button"
            onClick={handleDeleteTransaction}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
