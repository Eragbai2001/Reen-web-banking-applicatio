import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const authFormSchema = (type: string) => {
  return z.object({
    firstName: type === "register" ? z.string().min(1) : z.optional(z.string()),
    email: z.string().email(),
    passWord: z.string().min(6),
  });
};
