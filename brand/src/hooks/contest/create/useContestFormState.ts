import { useState, useCallback } from "react";
import { ContestCreateFormData } from "@/schema/createContestSchema";
import { ContestFormDefaultValues } from "@/constants/contest.constant";

const STORAGE_KEY = "contest_draft_data";
const STORAGE_CONTEST_ID_KEY = "contest_draft_contest_id";

// sessionStorageからデータを読み込む
const loadFromStorage = (): ContestCreateFormData | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    // Date型のフィールドを復元
    const dateFields = [
      "entry_start_date",
      "entry_end_date",
      "video_production_start_date",
      "video_production_end_date",
      "contest_start_date",
      "contest_end_date",
    ] as const;

    dateFields.forEach((field) => {
      if (parsed[field]) {
        parsed[field] = new Date(parsed[field]);
      }
    });

    return parsed as ContestCreateFormData;
  } catch (error) {
    console.error("Failed to load from sessionStorage:", error);
    return null;
  }
};

// sessionStorageにデータを保存
const saveToStorage = (data: ContestCreateFormData, contestId?: string) => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (contestId) {
      sessionStorage.setItem(STORAGE_CONTEST_ID_KEY, contestId);
    }
  } catch (error) {
    console.error("Failed to save to sessionStorage:", error);
  }
};

export function useContestFormState() {
  // 初期化時はsessionStorageから読み込む（なければデフォルト値）
  const [data, setDataState] = useState<ContestCreateFormData>(() => {
    const stored = loadFromStorage();
    return stored || ContestFormDefaultValues;
  });

  const updateData = useCallback(
    <T extends object>(partial: T, contestId?: string) => {
      setDataState((prev) => {
        const updated = { ...prev, ...partial };
        saveToStorage(updated, contestId);
        return updated;
      });
    },
    [],
  );

  // setDataをラップしてsessionStorageにも保存
  const setData = useCallback(
    (newData: ContestCreateFormData, contestId?: string) => {
      setDataState(newData);
      saveToStorage(newData, contestId);
    },
    [],
  );

  // sessionStorageをクリア
  const clearStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_CONTEST_ID_KEY);
  }, []);

  // sessionStorageにcontestIdが保存されているかチェック
  const hasStoredData = useCallback((contestId?: string): boolean => {
    if (typeof window === "undefined") return false;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    if (contestId) {
      const storedContestId = sessionStorage.getItem(STORAGE_CONTEST_ID_KEY);
      return storedContestId === contestId;
    }

    return true;
  }, []);

  return {
    data,
    updateData,
    setData,
    clearStorage,
    hasStoredData,
  };
}
