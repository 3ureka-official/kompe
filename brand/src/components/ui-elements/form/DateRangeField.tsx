"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DateInput } from "@/components/ui-elements/form/DateInput";
import { FieldError } from "@/components/ui/field";
import { FormField } from "@/components/ui-elements/form/FormField";

interface DateRangeFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name1: Path<T>;
  name2: Path<T>;
  required: boolean;
  label: string;
}

export function DateRangeField<T extends FieldValues = FieldValues>({
  control,
  name1,
  name2,
  required = false,
  label,
}: DateRangeFieldProps<T>) {
  return (
    <FormField label={label} required={required}>
      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name={name1}
          render={({ field, fieldState }) => (
            <div>
              <DateInput
                value={field.value}
                onChange={(e) => field.onChange(e)}
                required={required}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        <span className="text-sm text-gray-600">〜</span>

        <Controller
          control={control}
          name={name2}
          render={({ field, fieldState }) => (
            <div>
              <DateInput
                value={field.value}
                onChange={(e) => field.onChange(e)}
                required={required}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />
      </div>
    </FormField>
  );
}
