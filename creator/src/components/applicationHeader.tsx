"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const ApplicationHeader = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <nav className="w-full bg-white flex items-center justify-between gap-4 px-4 pt-4 pb-2 border-b">
      <Button onClick={handleGoBack} variant="ghost" size="icon">
        <ChevronLeftIcon className="size-6 stroke-2" />
      </Button>
      <h1 className="font-bold py-2">応募動画</h1>
      <span className="w-6" />
    </nav>
  );
};
