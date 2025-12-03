"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  defaultText: string;
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({
  isLoading,
  loadingText,
  defaultText,
  disabled = false,
  className = "",
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      variant="default"
      className={`w-full ${className}`}
    >
      {isLoading ? loadingText : defaultText}
    </Button>
  );
}
