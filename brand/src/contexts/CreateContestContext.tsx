"use client";
import React, { createContext, useState, ReactNode } from "react";
import { ContestCreateFormData } from "@/schema/createContestSchema";

type CreateContestContextType = {
  step: number;
  data: Partial<ContestCreateFormData>;
  next: <T extends object>(partial: T) => void;
  back: () => void;
};

export const CreateContestContext = createContext<CreateContestContextType>({
  step: 0,
  data: {},
  next: () => {},
  back: () => {},
});

/** Provider */
export function CreateContestProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<ContestCreateFormData>>({});

  const next = <T extends object>(partial: T) => {
    setData((prev) => ({ ...prev, ...partial }));
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <CreateContestContext.Provider
      value={{
        step,
        data,
        next,
        back,
      }}
    >
      {children}
    </CreateContestContext.Provider>
  );
}
