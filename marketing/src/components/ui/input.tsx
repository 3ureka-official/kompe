import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0050] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
