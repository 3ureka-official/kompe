"use client";

import { useContext, useEffect, useState } from "react";
import {
  CreateContestContext,
  CreateContestProvider,
} from "@/contexts/CreateContestContext";
import { AuthContext } from "@/contexts/AuthContext";
import { ContestFormLayout } from "@/components/contests/create/ContestFormLayout";

function CreateContestContent() {
  const { initContest } = useContext(CreateContestContext);
  const { brand } = useContext(AuthContext);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (brand?.id && !hasInitialized) {
      const initialize = async () => {
        await initContest(brand.id);
        setHasInitialized(true);
      };
      initialize();
    }
  }, [brand?.id, initContest, hasInitialized]);

  return <ContestFormLayout />;
}

export default function CreateContestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CreateContestProvider>
        <CreateContestContent />
      </CreateContestProvider>
    </div>
  );
}
