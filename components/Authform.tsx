"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import Register from "@/components/register";
import Login from "@/components/login";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Loader2, UserRound, Mail } from "lucide-react";
import { authFormSchema } from "@/lib/utils";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

// import { FunctionComponent } from "react"

const Authform = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const heightClass = type === 'log-in' ? 'h-96' : 'h-[30rem]'; // Example heights for different types
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      passWord: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }
 

  return (
    <section className="auth-form">
    <div className=" flex flex-col   ">
    {type === "log-in" ? <Login/> : <Register />}
    </div>
    
      <div className={`bg-white rounded-lg p-3  md:p-9  text-[#33B786] text-2xl shadow-2xl flex flex-col gap-7   ${heightClass} w-[70%] max-w-md md:max-w-lg lg:max-w-xl `}>
        {user ? "Link Account" : type === "log-in" ? "Login" : "Register"}

        {user ? (
          <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {type === "register" && (
                  <>
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="Name"
                      placeholder="Enter Your name "
                      icon={UserRound}
                      type={type}
                    />
                  </>
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
                  placeholder="Enter Your password "
                  icon={LockKeyhole}
                  type={type}
                />
                {/* <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div className="form-item">
                      <FormLabel className="form-label text-xs text-[#252525] ">
                        Name
                      </FormLabel>
                      <div className="flex w-full flex-col">
                        <FormControl className="flex justify-between">
                          <div className="relative">
                            <Input
                              placeholder="Enter name here"
                              className="input-class pr-10" // Add padding to the right to make space for the icon
                              {...field}
                            />
                            <UserRound className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          </div>
                        </FormControl>
                        <FormMessage className="form-message "></FormMessage>
                      </div>
                    </div>
                  )}
                /> */}
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
            <footer className="flex gap-1  ">
              <p className=" text-gray-600 text-xs ">
                {type === "log-in "
                  ? "Don't have an account? "
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "log-in" ? "/register " : "/log-in"}
                className="text-[#33B786] text-xs "
              >
                {type === "log-in" ? "Register" : "Log in."}
              </Link>
            </footer>
          </>
        )}
      </div>
      
    </section>
  );
};

export default Authform;
