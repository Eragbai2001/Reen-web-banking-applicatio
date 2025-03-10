// BankAccountList.jsx (or .tsx)
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Account {
  id: string;
  name: string;
  accountNumber: string;
  lastUpdated: string;
  balance: number;
}

interface BankAccountListProps {
  accounts: Account[];
  onRefresh: (id: string) => void;
  onConnect: () => void;
  refreshingId: string | null;
  isConnecting: boolean;
}

export function BankAccountList({
  accounts,
  onRefresh,
  onConnect,
  refreshingId,
  isConnecting,
}: BankAccountListProps) {
  return (
    <div className="space-y-4">
      {accounts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-600">
                    {account.accountNumber}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRefresh(account.id)}
                  disabled={refreshingId === account.id}
                  className="h-8 px-2"
                >
                  {refreshingId === account.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500">Last updated</p>
                  <p className="text-xs font-medium">
                    {formatDistanceToNow(new Date(account.lastUpdated), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Balance</p>
                  <p className="text-lg font-bold text-[#33B786]">
                    NGN {account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-gray-600 font-medium mb-2">No accounts connected</h3>
          <p className="text-gray-500 text-sm mb-4">
            Connect your bank account to get started.
          </p>
        </div>
      )}

      <div className="mt-4">
        <Button
          onClick={onConnect}
          disabled={isConnecting}
          className="bg-[#33B786] hover:bg-[#2a9e74] text-white"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Connect Bank
            </>
          )}
        </Button>
      </div>
    </div>
  );
}