"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface ResendCodeButtonProps {
  onClick: () => void;
  className?: string;
}

export function ResendCodeButton({
  onClick,
  className = "",
}: ResendCodeButtonProps) {
  return (
    <div className={`text-center ${className}`}>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onClick}
      >
        確認コードを再送信
      </Button>
    </div>
  );
}
