export interface SavingPlan {
  id: string
  name: string
  tagline: string
  title: string
  description: string
  term_alias: string
  term_duration: number
  term_unit: string
}

export type AccountStatus = 'empty' | 'funded' | 'archived' | 'interestCalculated' | 'mature' | 'processing'

export interface SavingAccount {
  id: string
  user_id: string
  plan_id: string
  plan: SavingPlan
  account_number: string
  status: AccountStatus
  saving_balance: number
  holding_balance: number
  committed_amount: number
  accrued_interest: number
  interest_amount: number
  interest_tax: number
  effective_date: string | null
  maturity_date: string | null
  created_at: string
  updated_at: string
}

export interface AccountsResponse {
  success: boolean
  data: SavingAccount[]
}

export interface TotalInterestResponse {
  success: boolean
  data: {
    metadata: {
      page: number
      per_page: number
      page_count: number
      total_count: number
    }
    additional_data: {
      sum: number
    }
    items: unknown[]
  }
}

export interface BalanceSummary {
  totalBalance: number
  totalInterest: number
}
