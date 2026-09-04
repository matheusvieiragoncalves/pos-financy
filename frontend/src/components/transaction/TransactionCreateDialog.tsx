import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useTransactions } from "@/stores/transactions"
import { useMemo, useState } from "react"

import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TransactionTypeEnum } from "@/enums"
import { formatDate } from "@/utils/format-date"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Transaction } from "@/models/transaction.model"
import { useCategories } from "@/stores/categories"

interface ITransactionCreateDialogProps {
  open: boolean
  transaction?: Transaction | null
  onClose: () => void
}

export function TransactionCreateDialog({
  open,
  transaction,
  onClose,
}: ITransactionCreateDialogProps) {
  const [date, setDate] = useState<Date>(
    (transaction?.date as Date) || new Date()
  )
  const [description, setDescription] = useState(transaction?.description || "")

  const [amountInCents, setAmountInCents] = useState(
    transaction ? transaction.amount * 100 : 0
  )
  const [categoryId, setCategoryId] = useState<null | string>(
    transaction?.category?.id || null
  )
  const [type, setType] = useState(transaction?.type || TransactionTypeEnum.OUT)

  const isLoading = useTransactions((state) => state.isLoading)
  const createTransaction = useTransactions((state) => state.createTransaction)
  const updateTransaction = useTransactions((state) => state.updateTransaction)

  const categories = useCategories((state) => state.categories)

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    if (!date || !description || !amountInCents || !categoryId || !type) return

    const obj = {
      date,
      description,
      amount: amountInCents / 100,
      categoryId,
      type,
    }

    if (transaction?.id) {
      updateTransaction(transaction.id, obj)
    } else {
      createTransaction(obj)
    }

    onCloseDialog()
  }

  function onCloseDialog() {
    setDate(new Date())
    setDescription("")
    setAmountInCents(0)
    setCategoryId(null)
    setType(TransactionTypeEnum.OUT)
    onClose()
  }

  function formatCurrency(valueInCents: number) {
    return (valueInCents / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, "") // remove tudo que não for número
    setAmountInCents(Number(digitsOnly))
  }

  const isInvalidForm = useMemo(() => {
    return !date || !description || !amountInCents || !categoryId || !type
  }, [date, description, amountInCents, categoryId, type])

  const items = useMemo(
    () => [
      { label: "Selecione", value: null },
      ...Array.from(categories.values()).map((item) => ({
        label: item.title,
        value: item.id,
      })),
    ],
    [categories]
  )

  return (
    <Dialog open={open} onOpenChange={onCloseDialog}>
      <DialogContent className="w-md rounded-md p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl leading-tight font-bold">
            Nova Transação
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2">
          <FieldSet>
            <FieldGroup>
              <RadioGroup
                defaultValue={transaction?.type || TransactionTypeEnum.OUT}
                className="flex gap-3 rounded-xl border p-2"
                onValueChange={(value) => setType(value)}
              >
                <FieldLabel
                  htmlFor="out"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm transition-colors has-data-checked:border-red-base has-data-checked:bg-white"
                >
                  <RadioGroupItem
                    value={TransactionTypeEnum.OUT}
                    id="out"
                    className="peer hidden"
                  />
                  <CircleArrowDown className="size-4 text-gray-400 peer-data-checked:text-red-base" />
                  <span className="text-sm font-medium text-gray-600 peer-data-checked:text-gray-800">
                    Despesa
                  </span>
                </FieldLabel>

                <FieldLabel
                  htmlFor="in"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm transition-colors has-data-checked:border-brand-base has-data-checked:bg-white"
                >
                  <RadioGroupItem
                    value={TransactionTypeEnum.IN}
                    id="in"
                    className="peer hidden"
                  />
                  <CircleArrowUp className="size-4 text-gray-400 peer-data-checked:text-brand-base" />
                  <span className="text-sm font-medium text-gray-600 peer-data-checked:text-gray-800">
                    Receita
                  </span>
                </FieldLabel>
              </RadioGroup>
            </FieldGroup>

            <Field>
              <FieldLabel
                className="text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Descrição
              </FieldLabel>
              <Input
                id="description"
                placeholder="Ex. Almoço no restaurante"
                className="rounded-lg border-gray-300 bg-white py-6 text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </Field>

            <FieldGroup className="flex flex-row">
              <Field>
                <FieldLabel
                  className="text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Data
                </FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="flex justify-start rounded-lg border-gray-300 bg-white py-6 text-gray-800"
                      >
                        {date ? (
                          <span className="text-base text-gray-600">
                            {formatDate(date)}
                          </span>
                        ) : (
                          <span className="text-base text-gray-600">
                            Selecione
                          </span>
                        )}
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      defaultMonth={date}
                      required
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <Field>
                <FieldLabel
                  className="text-sm font-medium text-gray-700"
                  htmlFor="amount"
                >
                  Valor
                </FieldLabel>
                <InputGroup className="rounded-lg border-gray-300 bg-white py-6 text-base">
                  <InputGroupAddon>
                    <InputGroupText className="text-gray-800">
                      R$
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    className="text-gray-800 placeholder:text-gray-800"
                    placeholder="0.00"
                    value={formatCurrency(amountInCents)}
                    onChange={handleAmountChange}
                  />
                </InputGroup>
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel
                className="text-sm font-medium text-gray-700"
                htmlFor="category"
              >
                Categoria
              </FieldLabel>

              <Select
                items={items}
                defaultValue={categoryId}
                onValueChange={(value: string | null) => setCategoryId(value)}
              >
                <SelectTrigger className="rounded-lg border-gray-300 bg-white py-6 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Button
              className="bg-brand-base py-6 text-base text-white hover:bg-brand-dark"
              type="submit"
              disabled={isLoading || isInvalidForm}
            >
              Salvar
            </Button>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  )
}
