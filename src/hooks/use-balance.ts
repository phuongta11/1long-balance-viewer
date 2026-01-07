import { useQuery } from '@tanstack/react-query'
import { getAccounts, getTotalInterest } from '@/api/saving'
import type { SavingAccount, BalanceSummary } from '@/types/saving'

function getAccountTotalBalance(account: SavingAccount): number {
  return account.saving_balance +
    (account.holding_balance ?? 0) +
    (account.committed_amount ?? 0)
}

function calculateTotalBalance(accounts: SavingAccount[]): number {
  return accounts
    .filter(account =>
      account.status === 'funded' ||
      (account.status === 'mature' && getAccountTotalBalance(account) > 0)
    )
    .reduce((total, account) => total + getAccountTotalBalance(account), 0)
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
