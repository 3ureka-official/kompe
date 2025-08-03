import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0.5 focus:ring-gray-900 focus:border-gray-900 resize-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
