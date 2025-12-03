"use client";

import { CodeInput } from "@/features/auth/common/components/ui-elements/CodeInput";
import { useCodeInputGroup } from "@/features/auth/verify-code/hooks/useCodeInputGroup";

interface CodeInputGroupProps {
  code: string[];
  onChange: (code: string[]) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
}

export function CodeInputGroup({
  code,
  onChange,
  onComplete,
  disabled = false,
}: CodeInputGroupProps) {
  const { inputRefs, handleCodeChange, handleKeyDown, handlePaste } =
    useCodeInputGroup({
      code,
      onChange,
      onComplete,
    });

  return (
    <div className="flex justify-center gap-2">
      {code.map((digit, index) => (
        <CodeInput
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={digit}
          onChange={(value) => handleCodeChange(index, value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
