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
import { Loader2, UserRound, Mail, LockKeyhole } from "lucide-react";
import { authFormSchema } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/user.action";

const Authform = ({ type }: { type: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const formSchema = authFormSchema(type);
  const baseHeightClass = type === "log-in" ? "h-[25rem]" : "h-[30rem]";
  const heightClass = errorMessage ? "h-[35rem]" : baseHeightClass;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      passWord: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (type === "register") {
        const userData = {
          firstName: data.firstName!,
          email: data.email!,
          password: data.passWord!,
        };
        const newUser = await register(userData);

        setUser(newUser);
      }

      if (type === "log-in") {
        const response = await login({
          email: data.email,
          password: data.passWord,
        });

        if (response) {
          // Set session cookie
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

  return (
    <section className=" flex justify-between items-center min-h-screen w-full px-0 lg:px-0">
      <div className=" hidden lg:flex flex-col ">
        {type === "log-in" ? <Login /> : <Register />}
      </div>

      <div
        className={`bg-white rounded-lg p-3 text-[#33B786] text-2xl shadow-2xl flex flex-col gap-7 ${heightClass} w-[90%] sm:w-[80%] md:w-[70%] max-w-md mx-auto lg:mx-0`}
      >
        {type === "log-in" ? "Login" : "Register"}

        {user ? (router.push("/log-in"), null) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === "register" && (
              <CustomInput
                control={form.control}
                name="firstName"
                label="FirstName"
                placeholder="Enter Your firstName"
                icon={UserRound}
                type={type}
              />
            )}
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter Your email"
              icon={Mail}
              type={type}
            />
            <CustomInput
              control={form.control}
              name="passWord"
              label="Password"
              placeholder="Enter Your password"
              icon={LockKeyhole}
              type={type}
            />

            {errorMessage && (
              <div className={`w-[20rem]`}>
                <p className="text-red-500 text-[15px]">{errorMessage}</p>
              </div>
            )}

            <Button type="submit" className="form-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp; Loading...
                </>
              ) : type === "log-in" ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>

        <footer className="flex gap-1">
          <p className="text-gray-600 text-xs">
            {type === "log-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "log-in" ? "/register" : "/log-in"}
            className="text-[#33B786] text-xs"
          >
            {type === "log-in" ? "Register" : "Log in."}
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default Authform;
