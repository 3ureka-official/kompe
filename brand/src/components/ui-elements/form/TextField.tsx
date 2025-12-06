"use client";

import { FormField } from "@/components/ui-elements/form/FormField";
import { Input } from "@/components/ui-elements/form/Input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required: boolean;
  description?: string;
  type?: "text" | "email" | "password" | "tel" | "url";
}

export function TextField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  description = "",
  type = "text",
}: TextFieldProps<T>) {
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
            <Input
              type={type}
              value={value}
              onChange={field.onChange}
              placeholder={placeholder}
            />
          </FormField>
        );
      }}
    />
  );
}
