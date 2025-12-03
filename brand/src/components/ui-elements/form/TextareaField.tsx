"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { FormField } from "@/components/ui-elements/form/FormField";
import { Textarea } from "@/components/ui/Textarea";

interface TextareaFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  description?: string;
  descriptionClassName?: string;
}

export function TextareaField({
  control,
  name,
  label,
  placeholder,
  required = false,
  rows = 3,
  maxLength,
  showCharCount = false,
  description,
  descriptionClassName,
}: TextareaFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = field.value || "";
        return (
          <FormField
            label={label || ""}
            required={required}
            error={fieldState.error?.message}
            description={description}
            descriptionClassName={descriptionClassName}
          >
            <div>
              <Textarea
                value={value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                {...(maxLength && { maxLength })}
              />
              {showCharCount && maxLength && (
                <div className="flex justify-end mt-1">
                  <span className="text-sm text-gray-500">
                    {value.length}/{maxLength}文字
                  </span>
                </div>
              )}
            </div>
          </FormField>
        );
      }}
    />
  );
}
