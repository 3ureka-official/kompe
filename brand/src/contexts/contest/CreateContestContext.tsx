'use client';

import React, { createContext, useContext, useState } from 'react';
import { Contest } from '@/types/contest';
import { createContest } from '@/services/contentestService';

interface CreateContestContextType {
  contest: Contest | null;
  setContest: (contest: Contest) => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSubmit: () => void;
}

const CreateContestContext = createContext<CreateContestContextType | undefined>(undefined);

export function useCreateContest() {
  const context = useContext(CreateContestContext);
  if (context === undefined) {
    throw new Error('useCreateContest must be used within an CreateContestProvider');
  }
  return context;
}

export function CreateContestProvider({ children }: { children: React.ReactNode }) {
  const [contest, setContest] = useState<Contest | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (contest) {
      createContest(contest);
    }
  };
    

  const value = {
    contest,
    setContest,
    handleNext,
    handlePrev,
    handleSubmit,
  };

  return (
    <CreateContestContext.Provider value={value}>
      {children}
    </CreateContestContext.Provider>
  );
} 