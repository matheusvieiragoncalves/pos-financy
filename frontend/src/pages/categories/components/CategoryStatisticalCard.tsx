import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideProps } from "lucide-react"

interface ICategoryStatisticalProps {
  value: string | number
  subTitle: string
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  iconColor: "text-purple-base" | "text-gray-700" | "text-blue-base"
}

export function CategoryStatisticalCard({
  Icon,
  value,
  subTitle,
  iconColor,
}: ICategoryStatisticalProps) {
  return (
    <Card className="flex w-full flex-row items-baseline justify-baseline p-6">
      <CardHeader className="mr-4 p-0">
        <CardTitle className="flex items-center gap-3 p-0">
          <Icon className={iconColor} />
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full p-0">
        <h4 className="mb-2 text-[24px] font-bold text-gray-800">{value}</h4>
        <p className="text-xs text-gray-500 uppercase"> {subTitle}</p>
      </CardContent>
    </Card>
  )
}
