"use client";

import { forwardRef } from "react";

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
  (
    { value, onChange, onKeyDown, onPaste, disabled = false, className = "" },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        disabled={disabled}
        className={`w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 ${className}`}
      />
    );
  },
);

CodeInput.displayName = "CodeInput";
