"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { FormField } from "@/components/ui-elements/form/FormField";
import { Input } from "@/components/ui-elements/form/Input";

interface UrlFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  descriptionClassName?: string;
}

export function UrlField({
  control,
  name,
  label,
  placeholder = "https://",
  required = false,
  description,
  descriptionClassName,
}: UrlFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={label || ""}
          required={required}
          error={fieldState.error?.message}
          description={description}
          descriptionClassName={descriptionClassName}
        >
          <Input
            type="url"
            value={field.value || ""}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        </FormField>
      )}
    />
  );
}
