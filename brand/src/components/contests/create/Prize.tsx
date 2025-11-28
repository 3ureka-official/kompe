import { Button } from "@/components/ui/Button";
import { useContext, useEffect } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { prizeSchema } from "@/schema/createContestSchema";
import { NumberInput } from "@/components/ui/NumberInput";
import { FormField } from "@/components/ui/FormField";
import { MinusIcon, PlusIcon } from "lucide-react";

export function Prize() {
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

  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <Controller
          control={control}
          name="prize_pool"
          render={({ field, fieldState }) => (
            <FormField
              label="総賞金額"
              required
              error={fieldState.error?.message}
            >
              <div className="flex items-center gap-2">
                <NumberInput
                  value={field.value || 0}
                  onChange={(e) => {
                    field.onChange(Number(e));
                  }}
                  className="w-48"
                  step={1000}
                  min={50000}
                />
                <span className="text-sm text-gray-700">円</span>
              </div>
            </FormField>
          )}
        />
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm mt-8">
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4">配分金額</h3>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-base font-medium text-gray-700">入賞者数</h4>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={removeWinner}
                disabled={
                  watchedDistribution && watchedDistribution.length <= 1
                }
                className="w-8 h-8 rounded-full border border-gray-300"
                variant={
                  watchedDistribution && watchedDistribution.length <= 1
                    ? "secondary"
                    : "default"
                }
              >
                <MinusIcon className="w-4 h-4" />
              </Button>
              <span className="text-base font-medium text-gray-700 min-w-[3rem] text-center">
                {watchedDistribution && watchedDistribution.length}人
              </span>
              <Button
                type="button"
                onClick={addWinner}
                className="w-8 h-8 rounded-full border border-gray-300"
                variant="default"
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Controller
            control={control}
            name="prize_distribution"
            render={({ field }) => (
              <div>
                <div className="space-y-4">
                  {field.value?.map((amount, index) => (
                    <div
                      key={index}
                      className="w-full flex gap-6 items-center justify-between"
                    >
                      <label className="block text-base font-medium text-gray-700">
                        {index + 1}位
                      </label>
                      <div className="flex items-center gap-2 w-48">
                        <NumberInput
                          value={amount || 0}
                          onChange={(e) => {
                            updateAmount(index, Number(e));
                          }}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                          step={1000}
                        />
                        <span className="text-sm">円</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />

          {watchedprize_pool > 0 && totalPrize !== watchedprize_pool && (
            <p className="text-sm text-red-500 mt-6">
              配分金額の合計（{totalPrize.toLocaleString()}
              円）が選択した総賞金額（{watchedprize_pool.toLocaleString()}
              円）と一致しません
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button
          type="button"
          variant="secondary"
          onClick={draft}
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "下書き保存"}
        </Button>

        <Button
          type="button"
          onClick={() => back(getValues())}
          variant="secondary"
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "前へ戻る"}
        </Button>

        <Button
          type="button"
          variant="default"
          disabled={isUpdating || isSubmitting}
          onClick={handleSubmit(publish)}
        >
          {isUpdating ? "保存中..." : "コンテストを作成"}
        </Button>
      </div>
    </div>
  );
}
