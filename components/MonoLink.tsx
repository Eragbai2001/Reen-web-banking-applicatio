// import { useState, useCallback } from "react";
// import { Wallet, Loader2 } from "lucide-react";

// export default function IndexPage() {
//   const [scriptLoaded, setScriptLoaded] = useState(false);
//   const [connected, setConnected] = useState(false);
//   const [connectionCode, setConnectionCode] = useState("");

//   const openMonoWidget = useCallback(async () => {
//     try {
//       const MonoConnectModule = await import("@mono.co/connect.js");
//       const MonoConnect = MonoConnectModule.default;

//       const monoInstance = new MonoConnect({
//         key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY || "",
//         onClose: () => {
//           console.log("Widget closed");
//           setScriptLoaded(false);
//         },
//         onLoad: () => {
//           console.log("Widget loaded");
//           setScriptLoaded(true);
//         },
//         onSuccess: ({ code }: { code: string }) => {
//           console.log(`Linked successfully: ${code}`);
//           setConnectionCode(code);
//           setConnected(true);
//           setScriptLoaded(false);
//         },
//       });

//       monoInstance.setup();
//       monoInstance.open();
//     } catch (error) {
//       console.error("Error loading Mono Connect:", error);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="bg-[#33B786] p-6 text-white">
//           <h1 className="text-2xl font-bold flex items-center">
//             <Wallet className="mr-2" size={24} />
//             Connect Your Bank Account
//           </h1>
//           <p className="mt-2 opacity-90">Securely link your financial accounts using Mono</p>
//         </div>

//         <div className="p-6">
//           {connected ? (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Connection Successful!</h2>
//               <p className="text-gray-600 mt-2">Your bank account has been linked successfully.</p>
//               {connectionCode && (
//                 <div className="mt-4 p-3 bg-gray-100 rounded text-sm font-mono break-all">
//                   Connection code: {connectionCode}
//                 </div>
//               )}
//               <button
//                 className="mt-6 w-full px-4 py-2 bg-[#33B786] text-white rounded-lg hover:bg-green-700 transition-colors"
//                 onClick={() => setConnected(false)}
//               >
//                 Connect Another Account
//               </button>
//             </div>
//           ) : (
//             <div>
//               <p className="text-gray-600 mb-6">
//                 Link your bank account to securely access your financial data. Your information is protected and you maintain control over what's shared.
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
//                     <span className="text-xs font-bold">1</span>
//                   </div>
//                   <p className="ml-3 text-sm text-gray-600">Select your bank from our supported institutions</p>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
//                     <span className="text-xs font-bold">2</span>
//                   </div>
//                   <p className="ml-3 text-sm text-gray-600">Log in with your online banking credentials</p>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
//                     <span className="text-xs font-bold">3</span>
//                   </div>
//                   <p className="ml-3 text-sm text-gray-600">Authorize access to your account information</p>
//                 </div>
//               </div>

//               <button
//                 className="mt-6 w-full px-4 py-3 bg-[#33B786] text-white rounded-lg hover:bg-green-700 flex items-center justify-center transition-colors"
//                 onClick={openMonoWidget}
//                 disabled={scriptLoaded}
//               >
//                 {scriptLoaded ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2" size={20} />
//                     Connecting...
//                   </>
//                 ) : (
//                   <>
//                     <Wallet className="mr-2" size={20} />
//                     Link Financial Account
//                   </>
//                 )}
//               </button>

//               {scriptLoaded && (
//                 <p className="mt-4 text-sm text-center text-gray-600">
//                   Please complete the process in the opened widget
//                 </p>
//               )}

//               <p className="mt-4 text-xs text-center text-gray-500">
//                 Your banking credentials are never stored. Data is encrypted and securely transmitted.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

interface BankAccount {
  id: string;
  name: string;
  account_number: string;
  balance: number;
  currency: string;
}

export default function IndexPage() {
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectionCode, setConnectionCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const openMonoWidget = useCallback(async () => {
    try {
      setScriptLoaded(true);
      setError(null);
      
      const MonoConnectModule = await import("@mono.co/connect.js");
      const MonoConnect = MonoConnectModule.default;

      const monoInstance = new MonoConnect({
        key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY || "",
        onClose: () => {
          console.log("Widget closed");
          setScriptLoaded(false);
        },
        onLoad: () => {
          console.log("Widget loaded");
        },
        onSuccess: ({ code }: { code: string }) => {
          console.log(`Linked successfully: ${code}`);
          setConnectionCode(code);
          setConnected(true);
          setScriptLoaded(false);
          
          // Simulate adding a bank account (in real app, you would fetch this data from API)
          setBankAccounts([
            {
              id: "acc_" + Math.random().toString(36).substring(2, 10),
              name: "Demo Bank Account",
              account_number: "**** " + Math.floor(1000 + Math.random() * 9000),
              balance: Math.floor(10000 + Math.random() * 90000),
              currency: "NGN"
            }
          ]);
          
          setConnecting(false);
        },
        onError: (error: any) => {
          console.error("Mono Connect error:", error);
          setError("Error connecting to Mono. Please try again.");
          setScriptLoaded(false);
        },
      });

      monoInstance.setup();
      monoInstance.open();
    } catch (error) {
      console.error("Error loading Mono Connect:", error);
      setError("Failed to launch connection interface. Please try again.");
      setScriptLoaded(false);
    }
  }, []);

  const handleSkip = () => {
    router.push("/log-in");
  };

  const handleConnectAnother = () => {
    setConnected(false);
  };

  return (
    <div className="flex flex-col w-full">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {connecting ? (
        <div className="bg-[#f0fdf9] p-4 rounded-lg border border-[#d0f0e5] mb-4">
          <div className="flex items-center">
            <Loader2 className="h-5 w-5 text-[#33B786] animate-spin mr-2" />
            <p className="text-[#33B786]">Connecting to your bank account...</p>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            This may take a few moments as we securely sync with your bank.
          </p>
        </div>
      ) : connected ? (
        <>
          <div className="bg-[#f0fdf9] p-4 rounded-lg border border-[#d0f0e5] mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#33B786] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-[#33B786]">Bank account connected successfully!</p>
            </div>
            {connectionCode && (
              <p className="text-gray-600 text-sm mt-2">
                Connection code: <span className="font-mono">{connectionCode}</span>
              </p>
            )}
          </div>
          
          <Button
            onClick={handleConnectAnother}
            className="bg-[#33B786] hover:bg-[#2C9D75] transition-all w-full mb-3"
          >
            Connect Another Account
          </Button>
          
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-transparent text-gray-600 hover:bg-gray-100 transition-all w-full"
          >
            Continue to Dashboard
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={openMonoWidget}
            disabled={scriptLoaded}
            className="bg-[#33B786] hover:bg-[#2C9D75] transition-all w-full mb-3"
          >
            {scriptLoaded ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              <>
                <Wallet className="mr-2" size={20} />
                Connect Bank Account
              </>
            )}
          </Button>

          <Button
            onClick={handleSkip}
            className="bg-transparent text-gray-600 hover:bg-gray-100 transition-all w-full"
          >
            Skip for now
          </Button>
        </>
      )}

      {bankAccounts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Connected Accounts
          </h3>
          <div className="space-y-2">
            {bankAccounts.map((account, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 