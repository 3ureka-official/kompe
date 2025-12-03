"use client";

import { forwardRef } from "react";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  className?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      placeholder,
      value,
      onChange,
      required = false,
      rows = 4,
      maxLength,
      showCharCount = false,
      className = "",
    },
    ref,
  ) => {
    return (
      <div>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0.5 focus:ring-gray-900 focus:border-gray-900 resize-none ${className}`}
          placeholder={placeholder}
          required={required}
          rows={rows}
          maxLength={maxLength}
          style={
            {
              fieldSizing: "content",
              minHeight: `${rows * 1.5}rem`,
            } as React.CSSProperties
          }
        />
        {showCharCount && maxLength && (
          <div className="flex justify-end mt-1">
            <span className="text-sm text-gray-500">
              {value.length}/{maxLength}文字
            </span>
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
