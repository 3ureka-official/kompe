"use client";

import { Input } from "@/components/ui-elements/form/Input";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type SnsType = "instagram" | "tiktok";

const snsConfig = {
  instagram: {
    icon: <FaInstagram className="w-6 h-6 text-pink-500" />,
    label: "Instagram",
    color: "text-pink-500",
    defaultPlaceholder: "https://instagram.com/username",
    type: "url" as const,
  },
  tiktok: {
    icon: <AiFillTikTok className="w-6 h-6 text-gray-900" />,
    label: "TikTok",
    color: "text-gray-900",
    defaultPlaceholder: "@username",
    type: "url" as const,
  },
};

type SnsLinkFieldProps<T extends FieldValues> = {
  type: SnsType;
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
};

export function SnsLinkField<T extends FieldValues>({
  control,
  type,
  name,
  placeholder,
  required = false,
}: SnsLinkFieldProps<T>) {
  const config = snsConfig[type];
  const finalPlaceholder = placeholder || config.defaultPlaceholder;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <div className="flex items-center mb-2">
            <div className={config.color}>{config.icon}</div>
            <Label className="block text-sm font-medium text-gray-700 ml-2">
              {config.label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          </div>
          <Input
            type={config.type}
            value={field.value}
            onChange={field.onChange}
            placeholder={finalPlaceholder}
            required={required}
          />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
}
