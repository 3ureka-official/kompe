import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicInfoSchema } from "@/features/contest/form/schemas/basicInfoSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";
import { useUploadFile } from "@/features/storage/hooks/useUploadFile";
import { useDeleteFiles } from "@/features/storage/hooks/useDeleteFiles";
import { BasicInfoFormData } from "../schemas/basicInfoSchema";
import { v4 as uuidv4 } from "uuid";

export function useBasicInfo() {
  const { data, next, submit, isPending, updateData } =
    useContext(CreateContestContext);

  const { control, handleSubmit, setValue, watch, getValues, reset } = useForm({
    resolver: yupResolver(basicInfoSchema),
    mode: "onSubmit",
    defaultValues: basicInfoSchema.cast(data),
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const watchThumbnailUrls = watch("thumbnail_urls") || [];

  // MultiImageUploadField用にImageItem[]形式に変換
  const watchThumbnail = watchThumbnailUrls.map((url: string) => ({ url }));

  const { mutate: uploadThumbnail, isPending: isUploadingThumbnail } =
    useUploadFile();
  const { mutate: deleteThumbnail, isPending: isDeletingThumbnail } =
    useDeleteFiles();

  const handleThumbnailSubmit = (file: File | null) => {
    if (!file) return;

    const currentUrls = getValues("thumbnail_urls") || [];
    const imageId = uuidv4();
    const path = `${imageId}.png`;

    uploadThumbnail(
      {
        bucket: "contests",
        path,
        file,
      },
      {
        onSuccess: (url) => {
          const updatedUrls = [...currentUrls, url];
          setValue("thumbnail_urls", updatedUrls);
          // 画像アップロード後に下書き保存（遷移しない）
          const values = { ...getValues(), thumbnail_urls: updatedUrls };
          updateData(values);
          submit(true, values, false);
        },
      },
    );
  };

  const handleDeleteThumbnail = (index: number) => {
    const currentUrls = getValues("thumbnail_urls") || [];
    const urlToDelete = currentUrls[index];

    if (!urlToDelete) return;

    // URLからパスを抽出（contests/uuid.png形式）
    const pathMatch = urlToDelete.match(/contests\/([^/]+\.png)$/);
    const path = pathMatch ? pathMatch[1] : "";

    deleteThumbnail(
      {
        bucket: "contests",
        paths: [path],
      },
      {
        onSuccess: () => {
          const updatedUrls = currentUrls.filter(
            (_: string, i: number) => i !== index,
          );
          setValue("thumbnail_urls", updatedUrls);
          // 画像削除後に下書き保存（遷移しない）
          const values = { ...getValues(), thumbnail_urls: updatedUrls };
          updateData(values);
          submit(true, values, false);
        },
      },
    );
  };

  const handleDraft = () => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  };

  const handleNext = handleSubmit((values: BasicInfoFormData | undefined) => {
    if (!values) return;
    updateData(values);
    next(values);
  });

  return {
    control,
    getValues,
    watchThumbnail,
    isLoading: isPending || isUploadingThumbnail || isDeletingThumbnail,
    handleThumbnailSubmit,
    handleDeleteThumbnail,
    handleDraft,
    handleNext,
  };
}
