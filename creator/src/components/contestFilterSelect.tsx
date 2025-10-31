"use client";

import { CONTEST_FILTER_OPTIONS } from "@/constants/contestSort.constant";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ContestFilterSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const period = searchParams.get("period");

  const [selectedOption, setSelectedOption] = useState<string>(period || "all");

  return (
    <NativeSelect
      onChange={(e) => {
        setSelectedOption(e.target.value);
        router.replace(`/?period=${e.target.value}`);
      }}
      className="bg-white"
      value={selectedOption}
    >
      {CONTEST_FILTER_OPTIONS.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {option.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
