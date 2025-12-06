import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { samplesSchema } from "@/features/contest/form/schemas/samplesSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";
import { SamplesFormData } from "@/features/contest/form/schemas/samplesSchema";
import { useUploadFile } from "@/features/storage/hooks/useUploadFile";
import { useDeleteFiles } from "@/features/storage/hooks/useDeleteFiles";

export function useSamples() {
  const { data, back, submit, isPending, updateData, next } =
    useContext(CreateContestContext);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(samplesSchema),
    mode: "onSubmit",
    defaultValues: samplesSchema.cast(data),
  });

  const formValues = watch();
  const hasSamples = formValues.has_sample || false;
  const sample = formValues;
  const watchSampleImageUrl = watch("sample_image_url") || "";

  const { mutate: uploadSampleImage, isPending: isUploadingSampleImage } =
    useUploadFile();
  const { mutate: deleteSampleImage, isPending: isDeletingSampleImage } =
    useDeleteFiles();

  useEffect(() => {
    if (data) {
      const castedData = samplesSchema.cast(data);
      if (castedData) {
        reset({ ...castedData });
      }
    }
  }, [data, reset]);

  const handleSampleChange = (updates: Partial<SamplesFormData>) => {
    if (!updates) return;
    Object.entries(updates).forEach(([key, value]) => {
      setValue(key as keyof SamplesFormData, value, { shouldValidate: false });
    });
  };

  const handleToggleChange = (checked: boolean) => {
    setValue("has_sample", checked, { shouldValidate: false });
  };

  const handleSampleImageSubmit = (file: File | null) => {
    if (!file) return;

    const imageId = uuidv4();
    const path = `${imageId}.png`;

    uploadSampleImage(
      {
        bucket: "contests",
        path,
        file,
      },
      {
        onSuccess: (url) => {
          setValue("sample_image_url", url);
          // 画像アップロード後に下書き保存（遷移しない）
          const values = { ...getValues(), sample_image_url: url };
          updateData(values);
          submit(true, values, false);
        },
      },
    );
  };

  const handleDeleteSampleImage = () => {
    const currentUrl = getValues("sample_image_url");
    if (!currentUrl) return;

    // URLからパスを抽出（contests/uuid.png形式）
    const pathMatch = currentUrl.match(/contests\/([^/]+\.png)$/);
    const path = pathMatch ? pathMatch[1] : "";

    deleteSampleImage(
      {
        bucket: "contests",
        paths: [path],
      },
      {
        onSuccess: () => {
          setValue("sample_image_url", "");
          // 画像削除後に下書き保存（遷移しない）
          const values = { ...getValues(), sample_image_url: "" };
          updateData(values);
          submit(true, values, false);
        },
      },
    );
  };

  const handleBack = () => {
    const values = getValues();
    back(values);
  };

  const handleDraft = () => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  };

  const handleNext = handleSubmit((values: SamplesFormData | undefined) => {
    if (!values) return;
    updateData(values);
    next(values);
  });

  return {
    control,
    handleSubmit,
    getValues,
    hasSamples,
    sample,
    watchSampleImageUrl,
    errors,
    isPending: isPending || isUploadingSampleImage || isDeletingSampleImage,
    handleSampleChange,
    handleToggleChange,
    handleSampleImageSubmit,
    handleDeleteSampleImage,
    handleDraft,
    handleNext,
    handleBack,
  };
}
