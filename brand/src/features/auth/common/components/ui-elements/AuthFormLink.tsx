"use client";

import React from "react";
import Link from "next/link";

interface AuthFormLinkProps {
  href: string;
  text: string;
  className?: string;
}

export function AuthFormLink({
  href,
  text,
  className = "",
}: AuthFormLinkProps) {
  return (
    <div className={`text-sm text-center ${className}`}>
      <Link href={href} className="font-medium underline">
        {text}
      </Link>
    </div>
  );
}
