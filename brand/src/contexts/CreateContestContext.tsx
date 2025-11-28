"use client";
import React, { createContext, ReactNode, useContext } from "react";
import { ContestCreateFormData } from "@/schema/createContestSchema";
import { useContestFormState } from "@/hooks/contest/create/useContestFormState";
import { useContestNavigation } from "@/hooks/contest/create/useContestNavigation";
import { useContestInit } from "@/hooks/contest/create/useContestInit";
import { useContestSubmit } from "@/hooks/contest/create/useContestSubmit";
import { AuthContext } from "@/contexts/AuthContext";

type CreateContestContextType = {
  step: number;
  data: Partial<ContestCreateFormData>;
  next: <T extends object>(partial: T) => void;
  back: <T extends object>(partial: T) => void;
  contestId: string | undefined;
  submit: (isDraft: boolean, newData: Partial<ContestCreateFormData>) => void;
  isCreating: boolean;
  isUpdating: boolean;
  updateData: <T extends object>(partial: T) => void;
  setContestId: (contestId: string) => void;
  initContest: (brandId: string, paramContestId?: string) => Promise<void>;
  clearInitFlag?: () => void;
};

export const CreateContestContext = createContext<CreateContestContextType>({
  step: 0,
  data: {},
  next: () => {},
  back: () => {},
  contestId: undefined,
  submit: () => {},
  isCreating: false,
  isUpdating: false,
  updateData: () => {},
  setContestId: () => {},
  initContest: async () => {},
});

/** Provider */
export function CreateContestProvider({ children }: { children: ReactNode }) {
  const { brand } = useContext(AuthContext);

  // フォーム状態管理（sessionStorageの読み込み・保存はuseContestFormState内で処理）
  const { data, updateData, setData, clearStorage, hasStoredData } =
    useContestFormState();

  // ステップ遷移
  const { step, setStep } = useContestNavigation();

  // コンテスト初期化
  const { contestId, setContestId, initContest, isCreating } = useContestInit(
    setData,
    hasStoredData,
  );

  // コンテスト送信
  const { submit, isUpdating } = useContestSubmit(
    data,
    brand ?? null,
    contestId,
    clearStorage,
  );

  // nextとbackをラップしてupdateDataも実行（updateData内でsessionStorageに保存される）
  const next = <T extends object>(partial: T) => {
    updateData(partial, contestId);
    setStep((s) => s + 1);
  };

  const back = <T extends object>(partial: T) => {
    updateData(partial, contestId);
    setStep((s) => Math.max(s - 1, 0));
  };

  // updateDataをラップしてcontestIdを渡す
  const updateDataWithContestId = <T extends object>(partial: T) => {
    updateData(partial, contestId);
  };

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
        updateData: updateDataWithContestId,
        setContestId,
        initContest,
        clearInitFlag: clearStorage,
      }}
    >
      {children}
    </CreateContestContext.Provider>
  );
}
