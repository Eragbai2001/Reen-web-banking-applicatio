// components/ConnectBankButton.tsx
"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Loader2 } from 'lucide-react';

interface ConnectBankButtonProps {
  onSuccess: (code: string) => void;
}

export function ConnectBankButton({ onSuccess }: ConnectBankButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      // Dynamically import Mono Connect
      const MonoConnectModule = await import("@mono.co/connect.js");
      const MonoConnect = MonoConnectModule.default;

      const monoInstance = new MonoConnect({
        key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY || "",
        onClose: () => {
          console.log("Widget closed");
          setIsConnecting(false);
        },
        onLoad: () => {
          console.log("Widget loaded");
        },
        onSuccess: ({ code }) => {
          console.log(`Linked successfully: ${code}`);
          onSuccess(code);
          setIsConnecting(false);
        },
        onError: (error) => {
          console.error("Mono Connect error:", error);
          setIsConnecting(false);
        },
      });

      monoInstance.setup();
      monoInstance.open();
    } catch (error) {
      console.error("Error loading Mono Connect:", error);
      setIsConnecting(false);
    }
  }, [onSuccess]);

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-[#33B786] hover:bg-[#2C9D75] transition-all w-full"
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="mr-2" size={20} />
          Connect Bank Account
        </>
      )}
    </Button>
  );
}