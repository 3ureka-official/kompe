'use client';

import { forwardRef } from 'react';

type Props = {
  type?: 'text' | 'email' | 'tel' | 'url' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = 'text', placeholder, value, onChange, required = false, className = '' }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${className}`}
        placeholder={placeholder}
        required={required}
      />
    );
  }
);

Input.displayName = 'Input'; 