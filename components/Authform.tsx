"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import Register from "@/components/register";
import Login from "@/components/login";
import { Form } from "@/components/ui/form";
import {
  Loader2,
  UserRound,
  Mail,
  LockKeyhole,
  MapPin,
  Phone,
  CreditCard,
  FileText,
} from "lucide-react";
import { authFormSchema } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/user.action";
import MonoLink from "@/components/MonoLink";

const Authform = ({ type }: { type: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  interface User {
    id: string;
    monoCustomerId: string;
    // Add other user properties if needed
  }

  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_Name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      identity: type === "register" ? { type: "", number: "" } : undefined, //
    },
  });

  const nextStep = () => {
    // Validate current step fields before proceeding
    if (step === 1) {
      const { first_name, last_Name, email, password } = form.getValues();
      if (type === "register" && (!first_name || !last_Name)) {
        form.trigger(["first_name", "last_Name"]);
        return;
      }
      if (!email || !password) {
        form.trigger(["email", "password"]);
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (type === "register") {
        const userData: SignUpParams = {
          first_name: data.first_name!,
          last_name: data.last_Name!,
          email: data.email!,
          phone: data.phone!,
          address: data.address!,
          identity: {
            // We can safely access identity since we know it exists for registration
            type:
              (data.identity?.type as "nin" | "bvn" | "passport" | "license") ||
              "nin",
            number: data.identity?.number || "",
          },
          password: data.password!,
          type: "individual", // Ensure this matches the union type
          id: "userId", // Add appropriate id value
        };
        const newUser = await register(userData);
        setUser(newUser);
      }

      if (type === "log-in") {
        // Fixed this line to match the hyphenated format
        const response = await login({
          email: data.email!,
          password: data.password!,
        });

        if (response) {
          document.cookie = `appwrite-session=${response.$id}; path=/;`;
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(
        error.response?.message || error.message || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full 
                ${
                  step > index
                    ? "bg-[#33B786] text-white"
                    : step === index + 1
                    ? "border-2 border-[#33B786] text-[#33B786]"
                    : "border-2 border-gray-300 text-gray-400"
                }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-16 ${
                  step > index + 1 ? "bg-[#33B786]" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <section className="flex justify-between items-center min-h-screen w-full bg-gradient-to-br from-[#f7f7f7] to-[#e6f7f2] lg:px-24">
      <div className="hidden lg:flex lg:w-1/2 flex-col h-full">
        {type === "log-in" ? <Login /> : <Register />}
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center px-4">
        <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 hover:shadow-[0_20px_50px_rgba(51,183,134,0.1)]">
          <div className="mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#33B786] to-[#2C9D75] bg-clip-text text-transparent">
              {type === "log-in" ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-gray-600 mt-2">
              {type === "log-in"
                ? "Sign in to access your account"
                : "Join us and start your financial journey"}
            </p>

            {user && (
              <p className="text-16 font-normal text-[#33B786] mt-4">
                Account created! Link your account to get started.
              </p>
            )}
          </div>

          {user ? (
            <div className="flex flex-col gap-4 my-8">
              <MonoLink customerId={user.monoCustomerId} />
            </div>
          ) : (
            <>
              {type === "register" && renderStepIndicator()}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {type === "register" && step === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                          control={form.control}
                          name="first_name"
                          label="First Name"
                          placeholder="Enter your first name"
                          icon={UserRound}
                          type={type}
                        />
                        <CustomInput
                          control={form.control}
                          name="last_Name"
                          label="Last Name"
                          placeholder="Enter your last name"
                          icon={UserRound}
                          type={type}
                        />
                      </div>
                    </>
                  )}

                  {(type === "log-in" || step === 1) && (
                    <>
                      <CustomInput
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        icon={Mail}
                        type={type}
                      />
                      <CustomInput
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        icon={LockKeyhole}
                        type={type}
                      />
                    </>
                  )}

                  {type === "register" && step === 2 && (
                    <>
                      <div className="bg-[#f9fefc] p-4 rounded-lg border border-[#e0f5ee] mb-4">
                        <h3 className="text-[#33B786] text-sm font-medium mb-2 flex items-center">
                          <CreditCard size={16} className="mr-2" />
                          Account Information
                        </h3>
                        <p className="text-gray-500 text-xs">
                          This information is required to create your financial
                          account.
                        </p>
                      </div>

                      <CustomInput
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="Enter your full address"
                        icon={MapPin}
                        type={type}
                      />

                      <CustomInput
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="+2341234567890"
                        icon={Phone}
                        type={type}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                          control={form.control}
                          name="identity.type"
                          label="ID Type"
                          placeholder="NIN, Passport, etc."
                          icon={FileText}
                          type={type}
                        />
                        <CustomInput
                          control={form.control}
                          name="identity.number"
                          label="ID Number"
                          placeholder="Enter ID number"
                          icon={FileText}
                          type={type}
                        />
                      </div>
                    </>
                  )}

                  {errorMessage && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    {type === "register" && step > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-white border border-[#33B786] text-[#33B786] hover:bg-[#f0fdf9] transition-all"
                      >
                        Back
                      </Button>
                    )}

                    {type === "register" && step < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 bg-[#33B786] hover:bg-[#2C9D75] transition-all"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-[#33B786] hover:bg-[#2C9D75] transition-all text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={20} className="animate-spin mr-2" />
                            Loading...
                          </>
                        ) : type === "register" ? (
                          "Sign Up"
                        ) : (
                          "Log In"
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>

              <div className="mt-8 text-center border-t pt-6">
                <p className="text-gray-600 text-sm">
                  {type === "log-in"
                    ? "Don't have an account yet?"
                    : "Already have an account?"}
                  <Link
                    href={type === "log-in" ? "/register" : "/log-in"}
                    className="text-[#33B786] font-medium ml-2 hover:underline"
                  >
                    {type === "log-in" ? "Create Account" : "Sign In"}
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Authform;
