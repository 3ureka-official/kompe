import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";
import { FormField } from "@/components/ui/FormField";
import { Controller, useForm } from "react-hook-form";
import { basicInfoSchema } from "@/schema/createContestSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { DateInput } from "@/components/ui/DateInput";
import { useUploadFile } from "@/hooks/storage/useUploadFile";
import Image from "next/image";
import { useDeleteFiles } from "@/hooks/storage/useDeleteFiles";

export function BasicInfo() {
  const { data, next, contestId, submit, isUpdating, updateData } =
    useContext(CreateContestContext);

  const { control, handleSubmit, setValue, watch, getValues, reset } = useForm({
    resolver: yupResolver(basicInfoSchema),
    mode: "onSubmit",
    defaultValues: {
      title: data.title || "",
      thumbnail_url: data.thumbnail_url || "",
      contest_start_date: data.contest_start_date || new Date(),
      contest_end_date: data.contest_end_date || new Date(),
    },
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const watchThumbnail = watch("thumbnail_url");

  const { mutate: uploadThumbnail } = useUploadFile();
  const { mutate: deleteThumbnail } = useDeleteFiles();

  const handleThumbnailSubmit = (file: File | null) => {
    if (!file) return;

    setUploadingThumbnail(true);

    uploadThumbnail(
      {
        bucket: "contests",
        path: `${contestId}/thumbnail.png`,
        file,
      },
      {
        onSuccess: (data) => {
          setValue("thumbnail_url", data);
        },
      },
    );
    setUploadingThumbnail(false);
  };

  const handleDeleteThumbnail = () => {
    setUploadingThumbnail(true);
    deleteThumbnail(
      {
        bucket: "contests",
        paths: [`${contestId}/thumbnail.png`],
      },
      {
        onSuccess: () => {
          setUploadingThumbnail(false);
          setValue("thumbnail_url", "");
        },
      },
    );
  };

  const draft = () => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 bg-white rounded-lg p-8 shadow-sm">
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

        <div>
          <Controller
            control={control}
            name="thumbnail_url"
            render={({ fieldState }) => (
              <FormField
                label="サムネイル画像"
                required
                error={fieldState.error?.message}
              >
                <FileUpload
                  handleSubmit={handleThumbnailSubmit}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                  className="w-full"
                  disabled={watchThumbnail !== ""}
                />
              </FormField>
            )}
          />
          {watchThumbnail !== "" && (
            <div className="flex justify-between items-center">
              <Image
                src={watchThumbnail || ""}
                alt="thumbnail"
                width={160}
                height={100}
                className="w-[160px] h-[100px] object-cover"
              />
              <Button
                type="button"
                variant="danger"
                onClick={() => handleDeleteThumbnail()}
              >
                削除
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-lg p-8 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          開催期間 <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">開始日</label>
            <Controller
              control={control}
              name="contest_start_date"
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
              name="contest_end_date"
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

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={draft}
            disabled={uploadingThumbnail || isUpdating}
          >
            {uploadingThumbnail || isUpdating ? "保存中..." : "下書き保存"}
          </Button>

          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit(next)}
            disabled={uploadingThumbnail || isUpdating}
          >
            {uploadingThumbnail || isUpdating ? "保存中..." : "次へ進む"}
          </Button>
        </div>
      </div>
    </div>
  );
}
