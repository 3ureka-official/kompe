"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { ContestCreateFormData } from "@/schema/createContestSchema";
import { ContestFormDefaultValues } from "@/constants/contest.constant";
import { useUpdateContest } from "@/hooks/contest/useUpdateContest";
import { useCreateContest } from "@/hooks/contest/useCreateContest";
import { BrandContext } from "@/contexts/BrandContext";
import { AssetItem, InspirationItem } from "@/types/Contest";
import { useRouter } from "next/navigation";

type CreateContestContextType = {
  step: number;
  data: Partial<ContestCreateFormData>;
  next: <T extends object>(partial: T) => void;
  back: <T extends object>(partial: T) => void;
  contestId: string | null;
  submit: (isDraft: boolean, newData: Partial<ContestCreateFormData>) => void;
  isCreating: boolean;
  isUpdating: boolean;
  updateData: <T extends object>(partial: T) => void;
};

export const CreateContestContext = createContext<CreateContestContextType>({
  step: 0,
  data: {},
  next: () => {},
  back: () => {},
  contestId: null,
  submit: (isDraft: boolean, newData: Partial<ContestCreateFormData>) => {},
  isCreating: false,
  isUpdating: false,
  updateData: <T extends object>(partial: T) => {},
});

/** Provider */
export function CreateContestProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ContestCreateFormData>(
    ContestFormDefaultValues,
  );
  const [contestId, setContestId] = useState<string | null>(null);
  const { brand } = useContext(BrandContext);

  const { mutate: createContest, isPending: isCreating } = useCreateContest();
  const { mutate: updateContest, isPending: isUpdating } = useUpdateContest();

  const next = <T extends object>(partial: T) => {
    setData((prev) => ({ ...prev, ...partial }));
    setStep((s) => s + 1);
  };

  const back = <T extends object>(partial: T) => {
    setData((prev) => ({ ...prev, ...partial }));
    setStep((s) => Math.max(s - 1, 0));
  };

  const updateData = <T extends object>(partial: T) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const submit = (
    isDraft: boolean,
    newData: Partial<ContestCreateFormData>,
  ) => {
    const mergedData = { ...data, ...newData };

    const assetsData: Omit<
      AssetItem,
      "id" | "created_at" | "brand_id" | "contest_id"
    >[] =
      mergedData.assets?.map((asset) => ({
        id: asset.id || null,
        file_url: asset.file_url || null,
        url: asset.url || null,
        description: asset.description || null,
      })) || [];

    const inspirationData: Omit<
      InspirationItem,
      "id" | "created_at" | "brand_id" | "contest_id"
    >[] =
      mergedData.inspirations?.map((inspiration) => ({
        id: inspiration.id || null,
        url: inspiration.url || null,
        description: inspiration.description || null,
      })) || [];

    const completeData = {
      title: mergedData.title || "",
      category: mergedData.category || "",
      description: mergedData.description || "",
      requirements: mergedData.requirements || "",
      application_start_date: mergedData.application_start_date || "",
      application_end_date: mergedData.application_end_date || "",
      contest_start_date: mergedData.contest_start_date || "",
      contest_end_date: mergedData.contest_end_date || "",
      prize_pool: mergedData.prize_pool || 0,
      prize_distribution: mergedData.prize_distribution || [],
      is_draft: isDraft,
    };

    if (!brand?.id || !contestId) return;

    updateContest(
      {
        brandId: brand.id,
        contestId: contestId,
        contestData: completeData,
        assetsData,
        inspirationData,
      },
      {
        onSuccess: () => {
          const storageKey = `contest:create:${brand.id}`;
          sessionStorage.removeItem(storageKey);

          router.push("/contests");
        },
      },
    );
  };

  useEffect(() => {
    if (!brand?.id) return;

    const storageKey = `contest:create:${brand.id}`;
    let contestId = sessionStorage.getItem(storageKey);

    if (contestId) {
      setContestId(contestId);
      return;
    } else {
      contestId = crypto.randomUUID();
      sessionStorage.setItem(storageKey, contestId);
    }

    createContest(
      {
        contestId: contestId,
        brandId: brand.id,
        contestData: data,
      },
      {
        onSuccess: (id) => {
          setContestId(id);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  }, [brand?.id]);

  return (
    <CreateContestContext.Provider
      value={{
        step,
        data,
        next,
        back,
        contestId,
        submit,
        isCreating,
        isUpdating,
        updateData,
      }}
    >
      {children}
    </CreateContestContext.Provider>
  );
}
