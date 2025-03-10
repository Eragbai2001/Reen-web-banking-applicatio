"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"

interface ConnectBankCardProps {
  onConnect: () => void
  isConnecting: boolean
}

export function ConnectBankCard({ onConnect, isConnecting }: ConnectBankCardProps) {
  return (
    <Card className="w-full cursor-pointer hover:bg-gray-50 transition-colors border-dashed" onClick={onConnect}>
      <CardContent className="flex flex-col items-center justify-center py-8 space-y-3">
        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <Plus className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="space-y-1 text-center">
          <h3 className="font-medium">Connect New Bank</h3>
          <p className="text-sm text-muted-foreground">Link your bank account securely</p>
        </div>
        {isConnecting && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin mr-2" />
            Connecting...
          </div>
        )}
      </CardContent>
    </Card>
  )
}

