import type { Category } from "@/models/category.model"
import type { Transaction } from "@/models/transaction.model"
import { CategoryIconTag } from "../category"

type TTransactionTitleProps = Pick<
  Transaction,
  "description" | "formattedDate"
> &
  Pick<Category, "color" | "Icon"> & {
    showDate?: boolean
  }

export function TransactionTitle({
  description,
  formattedDate,
  color,
  Icon,
  showDate = false,
}: TTransactionTitleProps) {
  return (
    <div className="flex flex-1 items-center gap-4">
      <CategoryIconTag Icon={Icon} color={color} />

      <div className="flex flex-col gap-0.5">
        <p className="text-base font-medium text-gray-800">{description}</p>
        {showDate && formattedDate && (
          <span className="text-sm font-light text-gray-600">
            {formattedDate}
          </span>
        )}
      </div>
    </div>
  )
}
