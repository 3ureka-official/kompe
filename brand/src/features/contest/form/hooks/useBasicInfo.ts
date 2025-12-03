import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicInfoSchema } from "@/features/contest/form/schemas/createContestSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";
import { useUploadFile } from "@/hooks/storage/useUploadFile";
import { useDeleteFiles } from "@/hooks/storage/useDeleteFiles";

export function useBasicInfo() {
  const { data, next, contestId, submit, isUpdating, updateData } =
    useContext(CreateContestContext);

  const { control, handleSubmit, setValue, watch, getValues, reset } = useForm({
    resolver: yupResolver(basicInfoSchema),
    mode: "onSubmit",
    defaultValues: {
      title: data.title || "",
      thumbnail_url: data.thumbnail_url || "",
      entry_start_date: data.entry_start_date || new Date(),
      entry_end_date: data.entry_end_date || new Date(),
      video_production_start_date:
        data.video_production_start_date || new Date(),
      video_production_end_date: data.video_production_end_date || new Date(),
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
          setUploadingThumbnail(false);
        },
        onError: () => {
          setUploadingThumbnail(false);
        },
      },
    );
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
        onError: () => {
          setUploadingThumbnail(false);
        },
      },
    );
  };

  const draft = () => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  };

  return {
    control,
    handleSubmit,
    getValues,
    watchThumbnail,
    uploadingThumbnail,
    isUpdating,
    handleThumbnailSubmit,
    handleDeleteThumbnail,
    draft,
    next,
  };
}
