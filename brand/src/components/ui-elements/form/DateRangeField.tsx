"use client";

import { Control, Controller } from "react-hook-form";
import { DateInput } from "@/components/ui-elements/form/DateInput";
import { FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/Label";
import { FormField } from "@/components/ui-elements/form/FormField";

interface DateRangeFieldProps {
  control: Control<any>;
  name1: string;
  name2: string;
  required: boolean;
  label: string;
}

export function DateRangeField({
  control,
  name1,
  name2,
  required = false,
  label,
}: DateRangeFieldProps) {
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
