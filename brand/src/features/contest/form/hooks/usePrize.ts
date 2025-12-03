import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { prizeSchema } from "@/features/contest/form/schemas/createContestSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";

export function usePrize() {
  const { data, back, submit, isUpdating } = useContext(CreateContestContext);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(prizeSchema),
    mode: "onBlur",
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

  const draft = () => {
    const values = getValues();
    submit(true, values);
  };

  const publish = () => {
    if (isSubmitting || isUpdating) return;

    const values = getValues();
    submit(false, values);
  };

  return {
    control,
    handleSubmit,
    watchedprize_pool,
    watchedDistribution,
    totalPrize,
    isSubmitting,
    isUpdating,
    addWinner,
    removeWinner,
    updateAmount,
    draft,
    publish,
    back,
    getValues,
  };
}
