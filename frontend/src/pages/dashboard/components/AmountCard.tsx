import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Amount } from "@/models/amount.model"

interface IAmountCardProps {
  amount: Amount
}

export function AmountCard({
  amount: { Icon, title, formattedAmount, color },
}: IAmountCardProps) {
  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Icon className={`h-5 w-5 text-${color}`} />
          <h5 className="text-xs font-medium text-gray-500 uppercase">
            {title}
          </h5>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[28px] font-bold text-gray-800">{formattedAmount}</p>
      </CardContent>
    </Card>
  )
}
