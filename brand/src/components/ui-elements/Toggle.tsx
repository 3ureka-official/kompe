"use client";

import { forwardRef } from "react";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
};

export const Toggle = forwardRef<HTMLInputElement, Props>(
  ({ checked, onChange, disabled = false, id, label }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <label
          htmlFor={id}
          className={`relative inline-flex items-center cursor-pointer ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
        {label && (
          <label htmlFor={id} className="text-sm text-gray-700">
            {label}
          </label>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
