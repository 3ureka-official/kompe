"use client";

import { CONTEST_FILTER_OPTIONS } from "@/constants/contestSort.constant";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContestFilterSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const period = searchParams.get("period");

  return (
    <NativeSelect
      onChange={(e) => {
        router.replace(`/?period=${e.target.value}`);
      }}
      className="bg-white"
      value={period || "all"}
    >
      {CONTEST_FILTER_OPTIONS.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {option.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
