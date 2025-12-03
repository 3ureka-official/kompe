import * as React from "react";

import { cn } from "@/lib/cn";

function Textarea({
  className,
  rows = 3,
  ...props
}: React.ComponentProps<"textarea"> & { rows?: number }) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 初期高さを設定
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [props.value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // 元のonChangeがあれば呼び出す
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      data-slot="textarea"
      rows={rows}
      className={cn(
        "w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0.5 focus:ring-gray-900 focus:border-gray-900 resize-none overflow-hidden",
        className,
      )}
      onChange={handleInput}
      {...props}
    />
  );
}

export { Textarea };
