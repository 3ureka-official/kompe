"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { VariantProps } from "class-variance-authority";

interface LoadingButtonProps
  extends Omit<React.ComponentProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
  loadingText: string;
  defaultText: string;
  disabled?: boolean;
}

export function LoadingButton({
  isLoading,
  loadingText,
  defaultText,
  disabled = false,
  variant,
  size,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      type={props.type || "button"}
      variant={variant}
      size={size}
      disabled={isLoading || disabled}
      className={className}
      {...props}
    >
      {isLoading ? loadingText : defaultText}
    </Button>
  );
}
