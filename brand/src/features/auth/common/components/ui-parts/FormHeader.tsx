"use client";

import React from "react";

interface FormHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function FormHeader({
  title,
  description,
  className = "",
}: FormHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
