import { apiClient } from './client'
import type { AccountsResponse, TotalInterestResponse, SavingAccount } from '@/types/saving'

export async function getAccounts(): Promise<SavingAccount[]> {
  const response = await apiClient.get<AccountsResponse>('/saving/account')
  return response.data.data
}

export async function getTotalInterest(): Promise<number> {
  const response = await apiClient.get<TotalInterestResponse>(
    '/saving/transaction',
    { params: { transaction_type: 'interest_accrual', per_page: 1, page: 1 } }
  )
  return response.data.data.additional_data.sum
}
