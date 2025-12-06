import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { briefSchema } from "@/features/contest/form/schemas/briefSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";

export function useBrief() {
  const { data, next, back, submit, isPending, updateData } =
    useContext(CreateContestContext);

  const { control, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(briefSchema),
    mode: "onSubmit",
    defaultValues: briefSchema.cast(data),
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
    isPending,
    draft,
    next,
    back,
  };
}
