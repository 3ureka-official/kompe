"use client";

import { ReactNode } from "react";
import {
  FieldLabel,
  FieldError,
  FieldDescription,
  Field,
} from "@/components/ui/field";

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
    <Field className="mb-2">
      <FieldLabel className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </FieldLabel>
      {children}
      {error && (
        <FieldError className="text-sm text-red-600">{error}</FieldError>
      )}
      {description && (
        <FieldDescription
          className={`text-sm text-gray-500 ${descriptionClassName}`}
        >
          {description}
        </FieldDescription>
      )}
    </Field>
  );
}
