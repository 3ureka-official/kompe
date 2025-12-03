"use client";

import { forwardRef } from "react";

type Props = {
  placeholder?: string;
  value: Date | string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

export const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, value, onChange, required = false, className = "" }, ref) => {
    return (
      <input
        ref={ref}
        type="date"
        value={
          value instanceof Date ? value.toISOString().split("T")[0] : value
        }
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${className}`}
        placeholder={placeholder}
        required={required}
      />
    );
  },
);

DateInput.displayName = "DateInput";
