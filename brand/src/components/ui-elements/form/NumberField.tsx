"use client";

import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormField } from "@/components/ui-elements/form/FormField";
import { NumberInput } from "@/components/ui-elements/form/NumberInput";

interface NumberFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  step?: number;
  description?: string;
  descriptionClassName?: string;
}

export function FormNumberField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  min,
  step = 1,
  description,
  descriptionClassName,
}: NumberFieldProps<T>) {
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
          <NumberInput
            value={field.value ?? 0}
            onChange={(value) => field.onChange(Number(value))}
            placeholder={placeholder}
            min={min}
            step={step}
          />
        </FormField>
      )}
    />
  );
}
