import { ReactNode } from "react";

interface InfoCardProps {
  children: ReactNode;
  className?: string;
}

export function InfoCard({ children, className = "" }: InfoCardProps) {
  return (
    <div
      className={`flex flex-col justify-between border rounded-lg p-4 bg-gray-50 ${className}`}
    >
      {children}
    </div>
  );
}
