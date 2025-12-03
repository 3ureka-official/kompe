import { LoadingButton } from "@/components/ui-elements/LoadingButton";
import { TextareaField } from "@/components/ui-elements/form/TextareaField";
import { useBrief } from "@/features/contest/form/hooks/useBrief";
import { ActionButtons } from "./ActionButtons";

export function Brief() {
  const { control, handleSubmit, getValues, isUpdating, draft, next, back } =
    useBrief();

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <TextareaField
          control={control as any}
          name="description"
          label="コンテスト概要"
          required
          placeholder="例：コンテストを通じた新作の認知・購入促進を目的としています。"
        />
      </div>

      <div className="flex flex-col gap-4 bg-white rounded-lg p-8 shadow-sm">
        <TextareaField
          control={control as any}
          name="requirements"
          label="動画の条件"
          required
          placeholder="例：新作のパンツを着用したコーデを撮影してください。"
        />
      </div>

      <ActionButtons
        isLoading={isUpdating}
        handleDraft={draft}
        handleBack={() => back(getValues())}
        handleNext={handleSubmit((data) => next(data))}
        handleSubmit={handleSubmit((data) => next(data))}
        needSubmitButton={false}
      />
    </div>
  );
}
