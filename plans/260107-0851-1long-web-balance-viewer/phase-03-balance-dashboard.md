# Phase 3: Balance Dashboard

## Overview

- **Priority**: P1
- **Status**: Completed
- **Effort**: 2h

Implement dashboard displaying Total Balance + Total Interest.

## Files Created

| Path | Description |
|------|-------------|
| `src/types/saving.ts` | Saving account types |
| `src/api/saving.ts` | Saving API functions |
| `src/utils/money.ts` | VND formatting |
| `src/hooks/use-balance.ts` | Balance data hook |
| `src/components/balance-card.tsx` | Balance display component |
| `src/pages/dashboard.tsx` | Dashboard page |

## Implementation Summary

1. Created saving types (SavingAccount, SavingPlan, BalanceSummary)
2. Built saving API functions (getAccounts, getTotalInterest)
3. Implemented VND money formatting with Intl.NumberFormat
4. Created useBalance hook with:
   - TanStack Query for accounts and interest
   - Balance calculation logic
5. Built BalanceCard component
6. Implemented Dashboard page with:
   - Loading skeleton
   - Error state with retry
   - Dark mode toggle
   - Refresh button

## Balance Calculation Logic

```typescript
// Per-account: savingBalance + holdingBalance + committedAmount
// Filter: status === 'funded' OR (status === 'mature' && balance > 0)
```

## Success Criteria

- [x] Dashboard loads balance data on mount
- [x] Total Balance shows correct sum
- [x] Only funded/mature accounts with balance > 0 included
- [x] Total Interest displays from API
- [x] Money formatted as VND (e.g., "10.000.000 ₫")
- [x] Refresh button refetches data
- [x] Dark mode toggle works
- [x] Logout redirects to login
