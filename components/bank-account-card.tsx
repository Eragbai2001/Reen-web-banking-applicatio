"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"

interface BankAccountCardProps {
  name: string
  accountNumber: string
  balance: number
  lastUpdated: string
  onRefresh: () => void
  isRefreshing: boolean
}

export function BankAccountCard({
  name,
  accountNumber,
  balance,
  lastUpdated,
  onRefresh,
  isRefreshing,
}: BankAccountCardProps) {
  // Get the first letter of bank name for the avatar
  const initial = name.charAt(0)

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-600 font-semibold text-lg">{initial}</span>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium leading-none">{name}</h3>
            <p className="text-sm text-muted-foreground">****{accountNumber.slice(-4)}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onRefresh} disabled={isRefreshing}>
          {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">NGN {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h2>
          <p className="text-sm text-muted-foreground">Last updated: {new Date(lastUpdated).toLocaleString()}</p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (balance / 100000) * 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

