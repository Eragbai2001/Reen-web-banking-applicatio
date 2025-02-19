"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Client, Account } from "appwrite";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OtpVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const appwriteClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const account = new Account(appwriteClient);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const email = searchParams.get("email");
    if (!email) {
      setErrorMessage("Missing email information.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const otpString = otp.join("");
      if (otpString.length !== 6) {
        throw new Error("Please enter all 6 digits");
      }

      // Verify phone token (used for email OTP in this case)
      await account.updatePhoneVerification(otpString);
      
      // Redirect to dashboard after successful verification
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error in OTP verification:", error);
      setErrorMessage(error.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    const email = searchParams.get("email");
    if (!email) {
      setErrorMessage("Missing email information.");
      return;
    }

    try {
      await account.createPhoneToken("email", email);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Error in resending OTP:", error);
      setErrorMessage("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verification</h1>
          <p className="text-gray-600">Please enter the verification code sent to your email</p>
        </div>

        <div className="flex gap-2 justify-center my-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold focus:border-blue-500 focus:outline-none"
              maxLength={1}
            />
          ))}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>
        )}

        <div className="flex flex-col items-center gap-4">
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>

          <Button
            onClick={resendOTP}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;