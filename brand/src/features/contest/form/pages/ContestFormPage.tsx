"use client";

import { useContext, useEffect, useState } from "react";
import {
  CreateContestContext,
  CreateContestProvider,
} from "@/features/contest/common/contexts/CreateContestContext";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { ContestFormLayout } from "@/features/contest/form/components/ui-parts/ContestFormLayout";

interface ContestFormPageContentProps {
  contestId?: string;
}

function ContestFormPageContent({ contestId }: ContestFormPageContentProps) {
  const { initContest } = useContext(CreateContestContext);
  const { brand } = useContext(AuthContext);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!brand?.id) return;

    const initialize = async () => {
      if (contestId) {
        // 編集モード
        await initContest(brand.id, contestId);
      } else {
        // 新規作成モード
        await initContest(brand.id);
      }
      setHasInitialized(true);
    };

    if (!hasInitialized) {
      initialize();
    }
  }, [brand?.id, initContest, contestId, hasInitialized]);

  return <ContestFormLayout />;
}

interface ContestFormPageProps {
  contestId?: string;
}

export function ContestFormPage({ contestId }: ContestFormPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CreateContestProvider>
        <ContestFormPageContent contestId={contestId} />
      </CreateContestProvider>
    </div>
  );
}
