"use client";

import { FormField } from "@/components/ui-elements/form/FormField";
import { Input } from "@/components/ui-elements/form/Input";
import { Control, Controller } from "react-hook-form";

interface TextFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  description?: string;
}

export function TextField({
  control,
  name,
  label,
  placeholder,
  required = false,
  description = "",
}: TextFieldProps) {
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
