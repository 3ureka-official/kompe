"use client";

import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormField } from "@/components/ui-elements/form/FormField";
import { Input } from "@/components/ui-elements/form/Input";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type?: "text" | "email" | "password" | "tel" | "url";
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  type = "text",
  label,
  placeholder,
  required = false,
}: InputFieldProps<T>) {
  // デフォルトのラベルとプレースホルダーをtypeから推測
  const defaultLabel =
    label ||
    (type === "email"
      ? "メールアドレス"
      : type === "password"
        ? "パスワード"
        : "");
  const defaultPlaceholder = placeholder || defaultLabel;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={defaultLabel}
          required={required}
          error={fieldState.error?.message}
        >
          <Input
            type={type}
            value={field.value}
            onChange={field.onChange}
            placeholder={defaultPlaceholder}
          />
        </FormField>
      )}
    />
  );
}
