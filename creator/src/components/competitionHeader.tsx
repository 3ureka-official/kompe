"use client";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export const CompetitionHeader = () => {
  return (
    <nav className="w-full flex items-center justify-between gap-4 px-4 pt-4 pb-2 border-b">
      <Link href="/">
        <ChevronLeftIcon className="size-6 stroke-2" />
      </Link>
      <h1 className="font-bold py-2">コンテストの詳細</h1>
      <span className="w-6" />
    </nav>
  );
};
