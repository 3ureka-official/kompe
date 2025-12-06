"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormField } from "@/components/ui-elements/form/FormField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  options?: { value: string; label: string }[];
};

/**
 * 試供品の貸す/提供を選択するラジオフィールドコンポーネント
 */
export function RadioField<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          required={required}
          error={fieldState.error?.message}
        >
          <RadioGroup
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
            className="flex gap-4"
          >
            {options?.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value.toLowerCase()}
                />
                <label htmlFor={option.value.toLowerCase()}>
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </FormField>
      )}
    />
  );
}
