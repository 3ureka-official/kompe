"use client";

import { useRef } from "react";

interface UseCodeInputGroupProps {
  code: string[];
  onChange: (code: string[]) => void;
  onComplete?: (code: string) => void;
}

export function useCodeInputGroup({
  code,
  onChange,
  onComplete,
}: UseCodeInputGroupProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // コード入力の処理
  const handleCodeChange = (index: number, value: string) => {
    // 数字のみ許可
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    onChange(newCode);

    // 次の入力フィールドにフォーカス
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // 6桁すべて入力されたらコールバックを呼び出す
    if (
      newCode.every((digit) => digit !== "") &&
      newCode.join("").length === 6
    ) {
      onComplete?.(newCode.join(""));
    }
  };

  // バックスペース処理
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ペースト処理
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      onChange(newCode);
      onComplete?.(pastedData);
    }
  };

  return {
    inputRefs,
    handleCodeChange,
    handleKeyDown,
    handlePaste,
  };
}
