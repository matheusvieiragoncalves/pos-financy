import { TransactionTypeEnum } from "@/enums"
import {
  AMOUNT_TYPE_COLOR_MAP,
  AMOUNT_TYPE_ICON_MAP,
  AmountTypeEnum,
} from "@/enums/amount-type.enum"
import type { Transaction } from "@/models/transaction.model"

type TTransactionTypeProps = Pick<Transaction, "type">

export function TransactionType({ type }: TTransactionTypeProps) {
  const Icon = AMOUNT_TYPE_ICON_MAP[type as unknown as AmountTypeEnum]
  const color = AMOUNT_TYPE_COLOR_MAP[type as unknown as AmountTypeEnum]
  const text = type === TransactionTypeEnum.IN ? "Entrada" : "Saída"

  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className={`text-${color}`} />}
      <p className={`text-base font-medium text-${color}`}>{text}</p>
    </div>
  )
}
