"use client";

import { Input } from "@/components/ui/Input";

type SnsType = "instagram" | "tiktok" | "website";

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
    icon: (
      <svg
        className="w-5 h-5 text-pink-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: "Instagram",
    color: "text-pink-500",
    defaultPlaceholder: "https://instagram.com/username",
  },
  tiktok: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z" />
      </svg>
    ),
    label: "TikTok",
    color: "text-gray-900",
    defaultPlaceholder: "@username",
  },
  website: {
    icon: (
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9-9c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z"
        />
      </svg>
    ),
    label: "ウェブサイト",
    color: "text-gray-600",
    defaultPlaceholder: "https://example.com",
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
        type={type === "website" || type === "instagram" ? "url" : "text"}
        value={value}
        onChange={onChange}
        placeholder={finalPlaceholder}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
