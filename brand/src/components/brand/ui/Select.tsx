'use client';

import { forwardRef } from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ options, value, onChange, required = false, className = '' }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 appearance-none cursor-pointer ${className}`}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select'; 