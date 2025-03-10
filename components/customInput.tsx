import React, { useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons for password toggle

type FormSchema = z.infer<ReturnType<typeof authFormSchema>>;

interface CustomInputProps {
  control: Control<FormSchema>;
  name: FieldPath<FormSchema>;
  label: string;
  placeholder: string;
  icon: React.ElementType; // Expect a component type for the icon
  type: string;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  icon,
  type,
}: CustomInputProps) => {
  // Add state to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Check if this is a password field
  const isPasswordField = name === "password" ;

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label text-xs text-[#252525] ">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl className="flex justify-between">
              <div className="relative">
                <Input
                  placeholder={placeholder}
                  className="input-class pr-10" // Add padding to the right to make space for the icon
                  {...field}
                  value={typeof field.value === 'object' ? '' : field.value}
                  // Set input type based on password field and visibility state
                  type={isPasswordField ? (showPassword ? "text" : "password") : "text"}
                />
                {/* Main icon on the right */}
                {icon &&
                  React.createElement(icon, {
                    className:
                      "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4",
                    stroke: "currentColor", // Ensure it uses the current text color
                    color: "inherit", // Or set a specific color if needed
                  })}
                
                {/* Password visibility toggle button */}
                {isPasswordField && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4"
                    tabIndex={-1} // Prevent tab focus on this button
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
                
                {/* Forgot password link (only show on login page for password field) */}
                {name === "password" && type === "log-in" && (
                  <div className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500 flex">
                    <div className="border-r border-gray-300 h-5 mr-2"></div>
                    <a
                      href="/forgot-password"
                      className="text-xs text-[#33B786] font-bold"
                    >
                      Forgot?
                    </a>
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage className="form-message"></FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;