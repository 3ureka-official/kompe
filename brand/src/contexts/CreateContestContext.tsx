"use client";
import React, { createContext, useState, ReactNode } from "react";
import { ContestCreateFormData } from "@/schema/contestCreateSchema";

type CreateContestContextType = {
  step: number;
  data: Partial<ContestCreateFormData>;
  next: <T extends object>(partial: T) => void;
  back: () => void;
  thumbnail: File | null;
  thumbnailPreview: string | null;
  setThumbnail: (file: File | null) => void;
  setThumbnailPreview: (preview: string | null) => void;
};

export const CreateContestContext = createContext<CreateContestContextType>({
  step: 0,
  data: {},
  next: () => {},
  back: () => {},
  thumbnail: null,
  thumbnailPreview: null,
  setThumbnail: () => {},
  setThumbnailPreview: () => {},
});

/** Provider */
export function CreateContestProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<ContestCreateFormData>>({});

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

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
        thumbnail,
        thumbnailPreview,
        setThumbnail,
        setThumbnailPreview,
      }}
    >
      {children}
    </CreateContestContext.Provider>
  );
}
