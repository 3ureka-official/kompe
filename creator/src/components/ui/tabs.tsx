"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "border-b-2 text-muted-foreground inline-flex h-12 w-fit items-center justify-center",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // base
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px]",
        "text-foreground dark:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "disabled:pointer-events-none disabled:opacity-50",
        // active styles: color + subtle bg
        "data-[state=active]:text-primary dark:data-[state=active]:text-primary",
        "data-[state=active]:font-bold",
        // "data-[state=active]:bg-primary/10 dark:data-[state=active]:bg-primary/15",
        // active shadow (そのまま維持)
        // "data-[state=active]:shadow-sm",
        // underline (active時のみ表示・スライドイン)
        "after:pointer-events-none after:absolute after:left-2 after:right-2 after:-bottom-[1px] after:h-0.5 after:rounded-full",
        "after:bg-transparent data-[state=active]:after:bg-primary",
        "after:origin-center after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-200",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
