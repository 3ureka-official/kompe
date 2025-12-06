import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resourcesSchema } from "@/features/contest/form/schemas/resourcesSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";
import { v4 as uuidv4 } from "uuid";
import { AssetItemFormData } from "@/features/contest/form/schemas/assetItemSchema";
import { InspirationItemFormData } from "@/features/contest/form/schemas/inspirationItemSchema";
import { ResourcesFormData } from "../schemas/resourcesSchema";

export function useResources() {
  const { next, back, data, submit, isPending, updateData } =
    useContext(CreateContestContext);

  const { handleSubmit, getValues, setValue, watch, reset } = useForm({
    resolver: yupResolver(resourcesSchema),
    mode: "onSubmit",
    defaultValues: resourcesSchema.cast(data),
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const watchedAssets = watch("assets");
  const watchedInspirations = watch("inspirations");

  const addAsset = (asset: AssetItemFormData) => {
    const assets = getValues("assets") || [];
    assets.push({
      id: uuidv4(),
      url: asset.url,
      description: asset.description,
    });
    setValue("assets", assets);
  };

  const removeAsset = (idx: number) => {
    const asset = getValues("assets")?.[idx];
    if (!asset) return;

    const assets = getValues("assets")?.filter((_, i) => i !== idx);
    setValue("assets", assets);
  };

  const addInspiration = (inspiration: InspirationItemFormData) => {
    const inspirationId = uuidv4();
    const inspirations = getValues("inspirations") || [];
    inspirations.push({
      id: inspirationId,
      url: inspiration.url,
      description: inspiration.description,
    });
    setValue("inspirations", inspirations);
  };

  const removeInspiration = (idx: number) => {
    const inspiration = getValues("inspirations")?.[idx];
    if (!inspiration) return;

    const inspirations = getValues("inspirations")?.filter((_, i) => i !== idx);
    setValue("inspirations", inspirations);
  };

  const handleDraft = () => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  };

  const handleBack = () => {
    const values = getValues();
    back(values);
  };

  const handleNext = handleSubmit((values: ResourcesFormData | undefined) => {
    if (!values) return;
    updateData(values);
    next(values);
  });

  return {
    watchedAssets,
    watchedInspirations,
    isPending,
    addAsset,
    removeAsset,
    addInspiration,
    removeInspiration,
    handleDraft,
    handleNext,
    handleBack,
  };
}
