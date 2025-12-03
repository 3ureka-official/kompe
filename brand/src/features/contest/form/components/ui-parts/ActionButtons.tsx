import { LoadingButton } from "@/components/ui-elements/LoadingButton";

type ActionButtonsProps = {
  isLoading: boolean;

  handleDraft?: () => void;
  handleBack?: () => void;
  handleNext?: () => void;
  handleSubmit?: () => void;

  needNextButton?: boolean;
  needBackButton?: boolean;
  needDraftButton?: boolean;
  needSubmitButton?: boolean;
};
export function ActionButtons({
  isLoading,
  handleDraft,
  handleBack,
  handleNext,
  handleSubmit,
  needNextButton = true,
  needBackButton = true,
  needDraftButton = true,
  needSubmitButton = true,
}: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-4">
      {needDraftButton && (
        <LoadingButton
          type="button"
          variant="secondary"
          onClick={handleDraft}
          isLoading={isLoading}
          loadingText="保存中..."
          defaultText="下書き保存"
        />
      )}

      {needBackButton && (
        <LoadingButton
          type="button"
          onClick={handleBack}
          variant="secondary"
          isLoading={isLoading}
          loadingText="保存中..."
          defaultText={"前へ戻る"}
        />
      )}

      {needNextButton && (
        <LoadingButton
          type="submit"
          variant="default"
          onClick={handleNext}
          isLoading={isLoading}
          loadingText="保存中..."
          defaultText="次へ進む"
        />
      )}

      {needSubmitButton && (
        <LoadingButton
          type="submit"
          variant="default"
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="保存中..."
          defaultText="コンテストを作成"
        />
      )}
    </div>
  );
}
