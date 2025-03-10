// Place this in a file named types/mono-connect.d.ts in your project

interface MonoConnectOptions {
  key: string;
  onSuccess: (data: any) => void;
  onClose: () => void;
  onLoad?: () => void;
  onEvent?: (eventName: string, data: any) => void;
  reference?: string;
  customerEmail?: string;
  customerId?: string;
}

interface MonoConnectInstance {
  open: () => void;
  close: () => void;
  reauthorise: (reauth_code: string) => void;
}

interface MonoConnectStatic {
  setup: (options: MonoConnectOptions) => MonoConnectInstance;
}

declare global {
  interface Window {
    Connect: MonoConnectStatic;
  }
}

export {};