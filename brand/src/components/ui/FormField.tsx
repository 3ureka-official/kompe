"use client";

import { ReactNode } from "react";

type Props = {
  label: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
  description?: string;
  descriptionClassName?: string;
};

export function FormField({
  label,
  required = false,
  children,
  error,
  description,
  descriptionClassName,
}: Props) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {description && (
        <p className={`text-sm text-gray-500 ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}
