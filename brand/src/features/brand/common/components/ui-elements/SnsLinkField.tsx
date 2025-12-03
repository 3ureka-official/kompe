"use client";

import { Input } from "@/components/ui-elements/form/Input";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

type SnsType = "instagram" | "tiktok";

type Props = {
  type: SnsType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string; // この行を追加
};

const snsConfig = {
  instagram: {
    icon: <FaInstagram className="w-6 h-6 text-pink-500" />,
    label: "Instagram",
    color: "text-pink-500",
    defaultPlaceholder: "https://instagram.com/username",
  },
  tiktok: {
    icon: <AiFillTikTok className="w-6 h-6 text-gray-900" />,
    label: "TikTok",
    color: "text-gray-900",
    defaultPlaceholder: "@username",
  },
};

export function SnsLinkField({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}: Props) {
  const config = snsConfig[type];
  const finalPlaceholder = placeholder || config.defaultPlaceholder;

  return (
    <div>
      <div className="flex items-center mb-2">
        <div className={config.color}>{config.icon}</div>
        <label className="block text-sm font-medium text-gray-700 ml-2">
          {config.label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      <Input
        type={type === "instagram" ? "url" : "text"}
        value={value}
        onChange={onChange}
        placeholder={finalPlaceholder}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
