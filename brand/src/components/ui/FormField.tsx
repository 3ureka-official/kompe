import { cn } from '@/lib/utils';
import React from 'react';

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export function FormField({
  name,
  label,
  type,
  value = '',
  onChange,
  placeholder,
  required = false,
  autoComplete = 'off',
  className
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className={cn(
            "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm",
            className
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
} 