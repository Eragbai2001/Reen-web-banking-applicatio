import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encryptId(id: string) {
  return btoa(id);
}
export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const authFormSchema = (type: string) => {
  return z.object({
    first_name:
      type === "register"
        ? z.string().min(1, { message: "First name is required." })
        : z.string().optional(),
    last_Name:
      type === "register"
        ? z.string().min(1, { message: "Last name is required." })
        : z.string().optional(),
    email: z
      .string()
      .email({ message: "Email must be a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    address:
      type === "register"
        ? z
            .string()
            .min(1, { message: "Address is required." })
            .max(50, { message: "Address1 must be 50 or fewer characters." })
        : z.string().optional(),
    phone:
      type === "register"
        ? z.string().regex(/^\+234\d{10}$/, {
            message:
              "Phone number must be a valid Nigerian number starting with +234.",
          })
        : z.string().optional(),
    identity:
      type === "register"
        ? z.object({
            type: z.string().min(1, { message: "Identity type is required." }),
            number: z
              .string()
              .min(1, { message: "Identity number is required." }),
          })
        : z
            .object({
              type: z.string().optional(),
              number: z.string().optional(),
            })
            .optional(),
  });
};
