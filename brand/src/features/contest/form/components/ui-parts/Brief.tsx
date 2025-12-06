import { TextareaField } from "@/components/ui-elements/form/TextareaField";
import { useBrief } from "@/features/contest/form/hooks/useBrief";
import { ActionButtons } from "./ActionButtons";

export function Brief() {
  const { control, handleSubmit, getValues, isPending, draft, next, back } =
    useBrief();

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <TextareaField
          control={control}
          name="description"
          label="PRする商品についての説明"
          required
          placeholder="
          PRする商品について詳しく説明してください。&#13;&#10;
          例：サッカーのフォーメーションを記録するためのアプリで...。4月に発売する新作のパンツで...。"
        />
      </div>

      <div className="flex flex-col gap-4 bg-white rounded-lg p-8 shadow-sm">
        <TextareaField
          control={control}
          name="requirements"
          label="動画の条件"
          required
          placeholder="例：新作のパンツを着用したコーデを撮影してください。日本語で撮影してください。"
        />
      </div>

      <ActionButtons
        isLoading={isPending}
        handleDraft={draft}
        handleBack={() => back(getValues())}
        handleNext={handleSubmit((data) => next(data))}
        needSubmitButton={false}
      />
    </div>
  );
}
