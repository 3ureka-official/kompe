"use client";

import React from "react";

interface FormErrorMessageProps {
  message: string | undefined;
  className?: string;
}

export function FormErrorMessage({
  message,
  className = "",
}: FormErrorMessageProps) {
  if (!message) return null;

  return <p className={`text-red-500 text-sm ${className}`}>{message}</p>;
}
