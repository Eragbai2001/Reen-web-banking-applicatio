// app/bank-accounts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { BankAccountList } from "@/components/bank-account-list";
import { ConnectBankButton } from "@/components/ConnectButtonBank";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import Script from "next/script";

export default function BankAccountsPage() {
  interface Account {
    id: string;
    name: string;
    account_number: string;
    balance: number;
    currency: string;
    lastUpdated: string;
  }
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [monoLoaded, setMonoLoaded] = useState(false);

  // Fetch connected accounts from the backend
  const fetchConnectedAccounts = async () => {
    try {
      const response = await axios.get("/api/connected-accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Failed to fetch connected accounts:", error);
      setError("Could not load connected accounts.");
    }
  };

  useEffect(() => {
    fetchConnectedAccounts();
  }, []);

  const handleRefresh = async (accountId: string) => {
    try {
      setRefreshingId(accountId);
      setError(null);

      const response = await axios.get(`/api/accounts/${accountId}/balance`);
      
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) =>
          acc.id === accountId
            ? {
                ...acc,
                balance: response.data.balance,
                lastUpdated: new Date().toISOString(),
              }
            : acc
        )
      );
    } catch (error) {
      console.error("Failed to refresh account:", error);
      setError("Failed to refresh account. Please try again.");
    } finally {
      setRefreshingId(null);
    }
  };

  return (
    <>
      <Script 
        src="https://connect.withmono.com/connect.js"
        onLoad={() => setMonoLoaded(true)}
      />
      
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Connected Banks</h1>
            <p className="text-gray-500">Manage your connected bank accounts</p>
          </div>

          {accounts.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm border w-full md:w-auto">
              <div className="text-sm text-gray-500">Total Balance</div>
              <div className="text-xl font-bold text-[#33B786]">
                NGN{" "}
                {accounts
                  .reduce((sum, acc) => sum + acc.balance, 0)
                  .toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {accounts.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-gray-600">
                      {account.account_number}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#33B786]">
                      {account.currency} {account.balance.toLocaleString()}
                    </p>
                    <button 
                      onClick={() => handleRefresh(account.id)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                      disabled={refreshingId === account.id}
                    >
                      {refreshingId === account.id ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {accounts.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center mb-6">
            <h3 className="text-gray-600 font-medium mb-2">No accounts connected</h3>
            <p className="text-gray-500 text-sm mb-4">
              Connect your bank account to get started.
            </p>
          </div>
        )}

        {monoLoaded && (
          <ConnectBankButton onSuccess={fetchConnectedAccounts} />
          
        )}
      </div>
    </>
  );
}