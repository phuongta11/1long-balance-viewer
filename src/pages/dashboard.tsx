import { useAuth } from '@/context/auth-context'
import { useBalance } from '@/hooks/use-balance'
import { useTheme } from '@/hooks/use-theme'
import { BalanceCard } from '@/components/balance-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Wallet, TrendingUp, LogOut, RefreshCw, Moon, Sun } from 'lucide-react'

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto max-w-4xl flex h-16 items-center justify-between px-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-40" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-40" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <p className="text-muted-foreground">Failed to load balance data</p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </div>
  )
}

export function Dashboard() {
  const { logout } = useAuth()
  const { summary, isLoading, isError, refetch } = useBalance()
  const { isDark, toggle: toggleTheme } = useTheme()

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError || !summary) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto max-w-4xl flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">1Long Balance</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              aria-label="Refresh data"
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
            <Button variant="ghost" onClick={logout}>
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <BalanceCard
            title="Total Balance"
            amount={summary.totalBalance}
            icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
          />
          <BalanceCard
            title="Total Interest"
            amount={summary.totalInterest}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </main>
    </div>
  )
}
