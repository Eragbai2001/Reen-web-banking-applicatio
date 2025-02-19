"use client";

// filepath: /c:/Users/Joshua/Desktop/Reen Bank/components/Authform.tsx
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
  const heightClass = type === "log-in" ? "h-96" : "h-[30rem]";

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

        if (response) router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <div className="flex flex-col">
        {type === "log-in" ? <Login /> : <Register />}
      </div>

      <div
        className={`bg-white rounded-lg p-3 md:p-9 text-[#33B786] text-2xl shadow-2xl flex flex-col gap-7 ${heightClass} w-[70%] max-w-md md:max-w-lg lg:max-w-xl`}
      >
        {type === "log-in" ? "Login" : "Register"}

        {user ? (router.push("/log-in"), null) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === "register" && (
              <CustomInput
                control={form.control}
                name="firstName"
                label="Name"
                placeholder="Enter Your name"
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

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
