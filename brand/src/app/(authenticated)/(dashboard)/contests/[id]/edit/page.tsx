"use client";

import { useContext, useEffect, use } from "react";
import {
  CreateContestContext,
  CreateContestProvider,
} from "@/contexts/CreateContestContext";
import { AuthContext } from "@/contexts/AuthContext";
import { ContestFormLayout } from "@/components/contests/create/ContestFormLayout";

function CreateContestContent({ contestId }: { contestId: string }) {
  const { initContest } = useContext(CreateContestContext);
  const { brand } = useContext(AuthContext);

  useEffect(() => {
    if (!brand?.id) return;

    const initialize = async () => {
      await initContest(brand.id, contestId);
    };
    initialize();
  }, [brand?.id, initContest, contestId]);

  return <ContestFormLayout />;
}

export default function CreateContestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateContestProvider>
        <CreateContestContent contestId={id} />
      </CreateContestProvider>
    </div>
  );
}
