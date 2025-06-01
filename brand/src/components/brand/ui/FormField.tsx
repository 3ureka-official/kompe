'use client';

import { ReactNode } from 'react';

type Props = {
  label: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
  description?: string;
};

export function FormField({ label, required = false, children, error, description }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
} 