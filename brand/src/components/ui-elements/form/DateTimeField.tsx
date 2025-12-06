"use client";

import { FormField } from "@/components/ui-elements/form/FormField";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface DateTimeFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  description?: string;
}

export function DateTimeField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required = false,
  description = "",
}: DateTimeFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = field.value || "";
        return (
          <FormField
            label={label}
            required={required}
            error={fieldState.error?.message}
            description={description}
          >
            <input
              type="datetime-local"
              value={value}
              onChange={field.onChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </FormField>
        );
      }}
    />
  );
}
