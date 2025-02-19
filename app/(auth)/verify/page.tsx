// app/verify/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyOTP } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function VerifyPage() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if we have a userId to verify
        const userId = sessionStorage.getItem('verifyUserId');
        if (!userId) {
            router.push('/register');
        }
    }, [router]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value && element.nextSibling) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const userId = sessionStorage.getItem('verifyUserId');
            if (!userId) throw new Error("User ID not found");

            const code = otp.join("");
            await verifyOTP(userId, code);
            
            // Clear verification data
            sessionStorage.removeItem('verifyUserId');
            
            // Redirect to login
            router.push('/log-in');
        } catch (error: any) {
            setError(error?.message || "Invalid verification code");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#33B786]">
                Verify Your Email
            </h2>
            <p className="text-gray-600 text-center mb-6">
                Enter the 6-digit code sent to your email
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center gap-2 mb-6">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            className="w-12 h-12 text-center border rounded-lg text-xl focus:border-[#33B786] focus:ring-1 focus:ring-[#33B786]"
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                <Button 
                    type="submit" 
                    className="w-full bg-[#33B786] hover:bg-[#2a9c70]"
                    disabled={isLoading || otp.some(digit => !digit)}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            &nbsp; Verifying...
                        </>
                    ) : (
                        "Verify Email"
                    )}
                </Button>
            </form>
        </div>
    );
}