"use client";

import { forwardRef } from "react";

type NumberInputProps = {
  placeholder?: string;
  value: number;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  step?: number;
  min?: number;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      placeholder,
      value,
      onChange,
      required = false,
      className = "",
      step = 1,
      min,
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${className}`}
        placeholder={placeholder}
        required={required}
        min={min !== undefined ? min : 0}
        step={step}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";
