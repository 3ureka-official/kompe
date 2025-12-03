import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return <div className={`mt-4 mb-10 ${className}`}>{children}</div>;
}
