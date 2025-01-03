import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function authFormSchema(type: string) {

  const baseSchema = {
    email: z.string().email({ message: "Invalid email address" }),
    passWord: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  };

  if (type === "register") {
    return z.object({
      ...baseSchema,
      firstName: z.string().min(3, { message: "First name must be at least 3 characters long" }),
    });
  }



  return z.object(baseSchema);
}