import { Button } from "@/components/ui/Button";
import { useContext, useEffect, useState } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { prizeSchema } from "@/schema/createContestSchema";
import { NumberInput } from "@/components/ui/NumberInput";
import { FormField } from "@/components/ui/FormField";
import { CONTEST_PLANS } from "@/constants/contest.constant";
import { Trophy } from "lucide-react";

export function Prize() {
  const { data, back, submit, isUpdating } = useContext(CreateContestContext);

  const { control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    resolver: yupResolver(prizeSchema),
    mode: "onSubmit",
    defaultValues: {
      prize_pool: data.prize_pool || 0,
      prize_distribution: data.prize_distribution || [0, 0, 0],
    },
  });

  const watchedprize_pool = watch("prize_pool");
  const watchedDistribution = watch("prize_distribution");

  const [totalPrize, setTotalPrize] = useState(0);

  useEffect(() => {
    if (data) {
      reset({ ...data });
      setTotalPrize(
        watchedDistribution.reduce((sum, amount) => sum + amount, 0),
      );
    }
  }, [data, reset]);

  const addWinner = () => {
    setValue("prize_distribution", [...watchedDistribution, 0]);
    setTotalPrize(watchedDistribution.reduce((sum, amount) => sum + amount, 0));
  };

  const removeWinner = () => {
    if (watchedDistribution && watchedDistribution.length > 1) {
      setValue("prize_distribution", watchedDistribution.slice(0, -1));
      setTotalPrize(
        watchedDistribution.reduce((sum, amount) => sum + amount, 0),
      );
    }
  };

  const updateAmount = (index: number, amount: number) => {
    const newDistribution = [...(watchedDistribution || [])];
    newDistribution[index] = amount;
    setValue("prize_distribution", newDistribution);
    setTotalPrize(newDistribution.reduce((sum, amount) => sum + amount, 0));
  };

  const draft = () => {
    const values = getValues();
    submit(true, values);
  };

  const publish = () => {
    const values = getValues();
    submit(false, values);
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-base font-medium text-gray-700 mb-4">総賞金額</h3>

        <Controller
          control={control}
          name="prize_pool"
          render={({ field, fieldState }) => (
            <FormField label="" error={fieldState.error?.message}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {CONTEST_PLANS.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex cursor-pointer rounded-lg border p-4 transition-colors ${
                      field.value === option.value
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="sr-only"
                      checked={field.value === option.value}
                      onChange={() => {
                        field.onChange(Number(option.value));
                      }}
                    />
                    <span className="flex flex-col items-center w-full justify-center gap-4">
                      <Trophy className={`w-12 h-12 ${option.textColor}`} />
                      <span className="block font-medium text-gray-900">
                        {option.label}
                      </span>
                    </span>
                  </label>
                ))}
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
              <button
                type="button"
                onClick={removeWinner}
                disabled={
                  watchedDistribution && watchedDistribution.length <= 1
                }
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{
                  backgroundColor:
                    watchedDistribution && watchedDistribution.length <= 1
                      ? "#9CA3AF"
                      : "#25F4EE",
                  color: "#000000",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="text-base font-medium text-gray-700 min-w-[3rem] text-center">
                {watchedDistribution && watchedDistribution.length}人
              </span>
              <button
                type="button"
                onClick={addWinner}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{
                  backgroundColor: "#25F4EE",
                  color: "#000000",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
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

      <div className="flex justify-end gap-4">
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
          type="submit"
          variant="primary"
          disabled={isUpdating}
          onClick={handleSubmit(publish)}
        >
          {isUpdating ? "保存中..." : "コンテストを作成"}
        </Button>
      </div>
    </div>
  );
}
