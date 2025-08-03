import { useState, useEffect, useCallback } from "react";
import { ApplicationData, ApplicationFormData } from "@/types/application";
import { ApplicationService } from "@/lib/api/application";
import { useAuth } from "@/contexts/AuthContext";

interface UseApplicationProps {
  contestId: string;
  userId: string;
  autoSaveDraft?: boolean;
}

export function useApplication({
  contestId,
  userId,
  autoSaveDraft = true,
}: UseApplicationProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingApplication, setExistingApplication] =
    useState<ApplicationData | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    tiktokUrl: "",
    agreedToTerms: false,
    agreedToGuidelines: false,
  });

  // 既存の応募をチェック
  const checkExistingApplication = useCallback(async () => {
    try {
      const application = await ApplicationService.checkApplicationStatus(
        contestId,
        userId,
      );
      setExistingApplication(application);
      return application;
    } catch (err) {
      console.error("Failed to check application status:", err);
      return null;
    }
  }, [contestId, userId]);

  // 下書きを読み込み
  const loadDraft = useCallback(() => {
    if (!user || !contestId) return;

    const draft = ApplicationService.getDraft(contestId, user.id);
    if (draft) {
      setFormData((prev) => ({
        ...prev,
        ...draft,
        agreedToTerms: false,
        agreedToGuidelines: false,
      }));
    }
  }, [user, contestId]);

  // フォームデータを更新
  const updateFormData = useCallback(
    (updates: Partial<ApplicationFormData>) => {
      setFormData((prev) => {
        const newData = { ...prev, ...updates };

        // 自動保存が有効で、ユーザーがログインしている場合は下書きを保存
        if (user && contestId && autoSaveDraft) {
          const draftData = {
            tiktokUrl: newData.tiktokUrl,
            agreedToTerms: newData.agreedToTerms,
            agreedToGuidelines: newData.agreedToGuidelines,
          };
          ApplicationService.saveDraft(contestId, user.id, draftData);
        }

        return newData;
      });
    },
    [user, contestId, autoSaveDraft],
  );

  // TikTok URLを検証
  const validateTikTokUrl = useCallback((url: string) => {
    return ApplicationService.validateTikTokUrl(url);
  }, []);

  // ハッシュタグを解析
  const parseHashtags = useCallback((text: string) => {
    return ApplicationService.parseHashtags(text);
  }, []);

  // 応募を送信
  const submitApplication =
    useCallback(async (): Promise<ApplicationData | null> => {
      if (!user || !contestId) {
        setError("ログインが必要です");
        return null;
      }

      // バリデーション
      const urlValidation = validateTikTokUrl(formData.tiktokUrl);
      if (!urlValidation.isValid) {
        setError(urlValidation.error || "TikTok URLが無効です");
        return null;
      }

      if (!formData.agreedToTerms) {
        setError("利用規約に同意してください");
        return null;
      }

      if (!formData.agreedToGuidelines) {
        setError("ガイドラインに同意してください");
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        const application = await ApplicationService.createApplication(
          contestId,
          user.id,
          formData,
        );

        // 応募完了後、下書きを削除
        ApplicationService.deleteDraft(contestId, user.id);
        // setExistingApplication(application);

        return application;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "応募に失敗しました";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    }, [user, contestId, formData, validateTikTokUrl]);

  // フォームをリセット
  const resetForm = useCallback(() => {
    setFormData({
      tiktokUrl: "",
      agreedToTerms: false,
      agreedToGuidelines: false,
    });
    setError(null);
  }, []);

  // エラーをクリア
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 初期化
  useEffect(() => {
    if (user && contestId) {
      checkExistingApplication();
      loadDraft();
    }
  }, [user, contestId, checkExistingApplication, loadDraft]);

  return {
    // 状態
    loading,
    error,
    existingApplication,
    formData,

    // アクション
    updateFormData,
    submitApplication,
    resetForm,
    clearError,

    // ユーティリティ
    validateTikTokUrl,
    parseHashtags,

    // 計算値
    canSubmit:
      formData.tiktokUrl &&
      formData.agreedToTerms &&
      formData.agreedToGuidelines,
    hasExistingApplication: !!existingApplication,
  };
}
