import { TransactionTypeEnum } from "@/enums"
import {
  AMOUNT_TYPE_COLOR_MAP,
  AMOUNT_TYPE_ICON_MAP,
  AmountTypeEnum,
} from "@/enums/amount-type.enum"
import type { Transaction } from "@/models/transaction.model"

type TTransactionAmountProps = Pick<Transaction, "formattedAmount" | "type">

export function TransactionAmount({
  formattedAmount,
  type,
}: TTransactionAmountProps) {
  const Icon = AMOUNT_TYPE_ICON_MAP[type as unknown as AmountTypeEnum]
  const color = AMOUNT_TYPE_COLOR_MAP[type as unknown as AmountTypeEnum]

  return (
    <div className="flex items-center gap-2">
      <p className="text-base font-medium text-gray-800">
        {type === TransactionTypeEnum.IN
          ? `+ ${formattedAmount}`
          : `- ${formattedAmount}`}
      </p>
      {Icon && <Icon className={`text-${color}`} />}
    </div>
  )
}
