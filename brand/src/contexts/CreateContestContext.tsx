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
import { useGetContest } from "@/hooks/contest/useGetContest";
import { useGetAssets } from "@/hooks/contest/asset/useGetAssets";
import { useGetInspirations } from "@/hooks/contest/inspiration/useGetInspirations";
import { useGetPayment } from "@/hooks/payment/useGetPayment";
import { useCreateCheckoutSession } from "@/hooks/stripe/useCreateCheckoutSession";

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
  setContestId: (contestId: string) => void;
  initContest: (brandId: string, paramContestId?: string) => void;
};

export const CreateContestContext = createContext<CreateContestContextType>({
  step: 0,
  data: {},
  next: () => {},
  back: () => {},
  contestId: null,
  submit: () => {},
  isCreating: false,
  isUpdating: false,
  updateData: () => {},
  setContestId: () => {},
  initContest: () => {},
});

/** Provider */
export function CreateContestProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ContestCreateFormData>(
    ContestFormDefaultValues,
  );
  const [contestId, setContestId] = useState<string>("");
  const { brand } = useContext(BrandContext);

  const { mutate: createContest, isPending: isCreating } = useCreateContest();
  const { mutate: updateContest, isPending: isUpdating } = useUpdateContest();
  const { getContestQuery } = useGetContest(contestId);
  const { getAssetsQuery } = useGetAssets(contestId);
  const { getInspirationsQuery } = useGetInspirations(contestId);

  const { mutate: createCheckoutSession } = useCreateCheckoutSession();

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
      thumbnail_url: mergedData.thumbnail_url || "",
      is_draft: true,
    };

    if (!brand?.id || !contestId) return;

    if (contestId) {
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
            if (!isDraft) {
              createCheckoutSession(
                { contestId: contestId, amountJpy: mergedData.prize_pool },
                {
                  onSuccess: (data) => {
                    window.location.href = data.url;
                  },
                },
              );
            } else {
              router.push("/contests");
            }
          },
        },
      );
    }
  };

  const initContest = (brandId: string, paramContestId?: string) => {
    let contestId = paramContestId;

    if (contestId) {
      setContestId(contestId);
    } else {
      contestId = crypto.randomUUID();
      createContest(
        {
          brandId: brandId,
          contestId: contestId,
          contestData: data,
        },
        {
          onSuccess: (id) => {
            setContestId(id);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (getContestQuery.data) {
      setData(getContestQuery.data as ContestCreateFormData);
    }
  }, [getContestQuery.data]);

  useEffect(() => {
    if (getAssetsQuery.data) {
      const assets = getAssetsQuery.data.map((asset) => ({
        id: asset.id,
        file_url: asset.file_url || "",
        url: asset.url || "",
        description: asset.description || "",
      }));
      setData((prev) => ({ ...prev, assets }));
    }
  }, [getAssetsQuery.data]);

  useEffect(() => {
    if (getInspirationsQuery.data) {
      const inspirations = getInspirationsQuery.data.map((inspiration) => ({
        id: inspiration.id,
        url: inspiration.url || "",
        description: inspiration.description || "",
      }));
      setData((prev) => ({ ...prev, inspirations }));
    }
  }, [getInspirationsQuery.data]);

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
        setContestId,
        initContest,
      }}
    >
      {children}
    </CreateContestContext.Provider>
  );
}
