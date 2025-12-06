import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PrizeFormData,
  prizeSchema,
} from "@/features/contest/form/schemas/prizeSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";

export function usePrize() {
  const { data, back, submit, isPending, updateData } =
    useContext(CreateContestContext);

  const { control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    resolver: yupResolver(prizeSchema),
    mode: "onBlur",
    defaultValues: prizeSchema.cast(data),
  });

  const watchedprize_pool = watch("prize_pool");
  const watchedDistribution = watch("prize_distribution");

  // totalPrizeを計算（watchedDistributionから自動計算）
  const totalPrize =
    watchedDistribution?.reduce((sum, amount) => sum + amount, 0) || 0;

  // dataが変更されたときにフォームをリセット
  useEffect(() => {
    if (data) {
      reset({
        prize_pool: data.prize_pool,
        prize_distribution: data.prize_distribution,
      });
    }
  }, [data, reset]);

  const addWinner = () => {
    setValue("prize_distribution", [...watchedDistribution, 0]);
  };

  const removeWinner = () => {
    if (watchedDistribution && watchedDistribution.length > 1) {
      setValue("prize_distribution", watchedDistribution.slice(0, -1));
    }
  };

  const updateAmount = (index: number, amount: number) => {
    const newDistribution = [...(watchedDistribution || [])];
    newDistribution[index] = amount;
    setValue("prize_distribution", newDistribution);
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

  const handlePublish = handleSubmit((values: PrizeFormData | undefined) => {
    if (!values) return;
    updateData(values);
    submit(false, values);
  });

  return {
    control,
    watchedprize_pool,
    watchedDistribution,
    totalPrize,
    isPending,
    addWinner,
    removeWinner,
    updateAmount,
    handleDraft,
    handlePublish,
    handleBack,
  };
}
