"use client";

import { ContestFormPage } from "@/features/contest/form/pages/ContestFormPage";
import { useParams } from "next/navigation";

export default function CreateContestPage() {
  const { id } = useParams<{ id: string }>();

  return <ContestFormPage contestId={id} />;
}
