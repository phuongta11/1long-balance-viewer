import { useQuery } from '@tanstack/react-query'
import { getAccounts, getTotalInterest } from '@/api/saving'
import type { SavingAccount, BalanceSummary } from '@/types/saving'

type PlanType = '1Term' | '1Safe' | '1Buff' | '1Income' | 'unknown'

function getPlanType(account: SavingAccount): PlanType {
  const name = account.plan?.name
  // Exact match like mobile app
  if (name === '1Safe') return '1Safe'
  if (name === '1Term') return '1Term'
  if (name === '1Buff') return '1Buff'
  if (name === '1Income') return '1Income'
  return 'unknown'
}

function calculateTotalBalance(accounts: SavingAccount[]): number {
  const byType = (type: PlanType) => accounts.filter(a => getPlanType(a) === type)

  // 1Safe/1Buff: take FIRST account only (single account per type)
  const oneSafe = byType('1Safe')[0]
  const oneBuff = byType('1Buff')[0]

  const oneSafeTotal = oneSafe
    ? oneSafe.saving_balance + (oneSafe.holding_balance ?? 0) + (oneSafe.committed_amount ?? 0)
    : 0

  const oneBuffTotal = oneBuff
    ? oneBuff.saving_balance + (oneBuff.holding_balance ?? 0) + (oneBuff.committed_amount ?? 0)
    : 0

  // 1Term: filter by status + ONLY saving_balance
  const oneTermTotal = byType('1Term')
    .filter(a => a.status === 'funded' || (a.status === 'mature' && a.saving_balance > 0))
    .reduce((sum, a) => sum + a.saving_balance, 0)

  // 1Income: filter by status + full sum
  const oneIncomeTotal = byType('1Income')
    .filter(a => a.status === 'funded' || (a.status === 'mature' && a.saving_balance > 0))
    .reduce((sum, a) => sum + a.saving_balance + (a.holding_balance ?? 0) + (a.committed_amount ?? 0), 0)

  return oneTermTotal + oneSafeTotal + oneBuffTotal + oneIncomeTotal
}

export function useBalance() {
  const accountsQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  })

  const interestQuery = useQuery({
    queryKey: ['totalInterest'],
    queryFn: getTotalInterest,
  })

  const isLoading = accountsQuery.isLoading || interestQuery.isLoading
  const isError = accountsQuery.isError || interestQuery.isError
  const error = accountsQuery.error || interestQuery.error

  const summary: BalanceSummary | null = accountsQuery.data && interestQuery.data !== undefined
    ? {
        totalBalance: calculateTotalBalance(accountsQuery.data),
        totalInterest: interestQuery.data,
      }
    : null

  return {
    summary,
    isLoading,
    isError,
    error,
    refetch: () => {
      accountsQuery.refetch()
      interestQuery.refetch()
    },
  }
}
