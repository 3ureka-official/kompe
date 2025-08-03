import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SelectWithOptions } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { FileUpload } from "@/components/ui/FileUpload";
import { Controller, useForm } from "react-hook-form";
import { CONTEST_CATEGORIES } from "@/constants/contestCategory.constant";
import { basicInfoSchema } from "@/schema/contestCreateSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { DateInput } from "@/components/ui/DateInput";

export function BasicInfo() {
  const {
    data,
    next,
    step,
    thumbnail,
    thumbnailPreview,
    setThumbnail,
    setThumbnailPreview,
  } = useContext(CreateContestContext);

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(basicInfoSchema),
    mode: "onSubmit",
    defaultValues: {
      title: data.title || "",
      category: data.category || "",
      applicationStartDate: data.applicationStartDate || new Date(),
      applicationEndDate: data.applicationEndDate || new Date(),
      contestStartDate: data.contestStartDate || new Date(),
      contestEndDate: data.contestEndDate || new Date(),
    },
  });

  useEffect(() => {
    if (step === 0) {
      if (thumbnail) {
        setValue("thumbnailFile", thumbnail);
      }
    }
  }, [step, thumbnail, thumbnailPreview, setValue]);

  return (
    <div>
      <div className="flex flex-col gap-8 bg-white rounded-lg p-8 shadow-sm">
        <div className="flex gap-4">
          <div className="w-full">
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <FormField
                  label="コンテストタイトル"
                  required
                  error={fieldState.error?.message}
                >
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="例：コーディネートコンテスト"
                  />
                </FormField>
              )}
            />
          </div>

          <div className="w-full">
            <Controller
              control={control}
              name="category"
              render={({ field, fieldState }) => (
                <FormField
                  label="カテゴリー"
                  required
                  error={fieldState.error?.message}
                >
                  <SelectWithOptions
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    options={CONTEST_CATEGORIES}
                    placeholder="カテゴリーを選択してください"
                    className="w-full"
                  />
                </FormField>
              )}
            />
          </div>
        </div>

        <div>
          <Controller
            control={control}
            name="thumbnailFile"
            render={({ field, fieldState }) => (
              <FormField
                label="サムネイル画像"
                required
                error={fieldState.error?.message}
              >
                <FileUpload
                  file={field.value || null}
                  preview={thumbnailPreview}
                  onFileChange={(file) => {
                    setThumbnail(file);
                    field.onChange(file);
                  }}
                  onPreviewChange={setThumbnailPreview}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                  className="w-full"
                />
              </FormField>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            応募期間 <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">開始日</label>
              <Controller
                control={control}
                name="applicationStartDate"
                render={({ field, fieldState }) => (
                  <div>
                    <DateInput
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">終了日</label>
              <Controller
                control={control}
                name="applicationEndDate"
                render={({ field, fieldState }) => (
                  <div>
                    <DateInput
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            開催期間 <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">開始日</label>
              <Controller
                control={control}
                name="contestStartDate"
                render={({ field, fieldState }) => (
                  <div>
                    <DateInput
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">終了日</label>
              <Controller
                control={control}
                name="contestEndDate"
                render={({ field, fieldState }) => (
                  <div>
                    <DateInput
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Button type="button" variant="secondary">
            下書き保存
          </Button>

          <Button type="submit" variant="primary" onClick={handleSubmit(next)}>
            次へ進む
          </Button>
        </div>
      </div>
    </div>
  );
}
