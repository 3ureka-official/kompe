import { ReactNode } from "react";

interface LabeledTextProps {
  label: string;
  children: ReactNode;
  labelClassName?: string;
  contentClassName?: string;
  className?: string;
}

export function LabeledText({
  label,
  children,
  labelClassName = "",
  contentClassName = "",
  className = "",
}: LabeledTextProps) {
  return (
    <div className={className}>
      <div
        className={`text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
      >
        {label}
      </div>
      <div className={`text-sm text-gray-500 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
