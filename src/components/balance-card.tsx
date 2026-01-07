import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatMoney } from '@/utils/money'

interface BalanceCardProps {
  title: string
  amount: number
  icon?: React.ReactNode
  className?: string
}

export function BalanceCard({ title, amount, icon, className }: BalanceCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatMoney(amount)}</div>
      </CardContent>
    </Card>
  )
}
