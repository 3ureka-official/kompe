import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resourcesSchema } from "@/features/contest/form/schemas/createContestSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import {
  assetFormSchema,
  inspirationItemSchema,
} from "@/features/contest/form/schemas/createContestSchema";

export function useResources() {
  const { next, back, data, submit, isUpdating } =
    useContext(CreateContestContext);

  const { handleSubmit, getValues, setValue, watch, reset } = useForm({
    resolver: yupResolver(resourcesSchema),
    mode: "onSubmit",
    defaultValues: {
      assets: data.assets ?? [],
      inspirations: data.inspirations ?? [],
    },
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const watchedAssets = watch("assets");
  const watchedInspirations = watch("inspirations");

  const addAsset = (asset: yup.InferType<typeof assetFormSchema>) => {
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

  const addInspiration = (
    inspiration: yup.InferType<typeof inspirationItemSchema>,
  ) => {
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

  const draft = () => {
    const values = getValues();
    submit(true, values);
  };

  return {
    handleSubmit,
    getValues,
    watchedAssets,
    watchedInspirations,
    isUpdating,
    addAsset,
    removeAsset,
    addInspiration,
    removeInspiration,
    draft,
    next,
    back,
  };
}
