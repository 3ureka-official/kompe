import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { briefSchema } from "@/features/contest/form/schemas/createContestSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";

export function useBrief() {
  const { data, next, back, submit, isUpdating, updateData } =
    useContext(CreateContestContext);

  const { control, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(briefSchema),
    mode: "onSubmit",
    defaultValues: {
      description: data.description || "",
      requirements: data.requirements || "",
      requires_purchase_proof: data.requires_purchase_proof || false,
      purchase_product_name: data.purchase_product_name || null,
      purchase_product_url: data.purchase_product_url || null,
      purchase_description: data.purchase_description || null,
    },
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const draft = () => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  };

  return {
    control,
    handleSubmit,
    getValues,
    isUpdating,
    draft,
    next,
    back,
  };
}
