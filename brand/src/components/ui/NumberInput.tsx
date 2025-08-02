'use client';

import { forwardRef } from 'react';

type Props = {
  placeholder?: string;
  value: number;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  step?: number;
};

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, value, onChange, required = false, className = '', step = 1 }, ref) => {
    return (
      <input
        ref={ref}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${className}`}
        placeholder={placeholder}
        required={required}
        min={0}
        step={step}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput'; 