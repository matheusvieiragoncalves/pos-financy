import { TransactionTypeEnum } from "@/enums"
import { AMOUNT_TYPE_ICON_MAP, AmountTypeEnum } from "@/enums/amount-type.enum"
import type { Category } from "@/models/category.model"
import type { Transaction } from "@/models/transaction.model"

type TTransactionAmountProps = Pick<Transaction, "formattedAmount" | "type"> &
  Pick<Category, "color">

export function TransactionAmount({
  formattedAmount,
  color,
  type,
}: TTransactionAmountProps) {
  const Icon = AMOUNT_TYPE_ICON_MAP[type as unknown as AmountTypeEnum]

  return (
    <div className="flex items-center gap-2">
      <p className="text-base font-medium text-gray-800">
        {type === TransactionTypeEnum.IN
          ? `+ ${formattedAmount}`
          : `- ${formattedAmount}`}
      </p>
      {Icon && <Icon className={`${color.text}`} />}
    </div>
  )
}
