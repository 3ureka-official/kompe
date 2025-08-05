import { Button } from "@/components/ui/Button";
import { useContext, useState } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { prizeSchema } from "@/schema/createContestSchema";
import { NumberInput } from "@/components/ui/NumberInput";
import { FormField } from "@/components/ui/FormField";
import { CONTEST_PLANS } from "@/constants/contestPlanConstant";
import { useCreateContest } from "@/hooks/contest/useCreateContest";
import { BrandContext } from "@/contexts/BrandContext";
import { FormAssetItem, InspirationItem } from "@/types/Contest";
import { useRouter } from "next/navigation";

export function Prize() {
  const router = useRouter();
  const { brand } = useContext(BrandContext);
  const { mutate: createContest, isPending } = useCreateContest();

  const { data, back } = useContext(CreateContestContext);

  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    resolver: yupResolver(prizeSchema),
    mode: "onSubmit",
    defaultValues: {
      prizePool: data.prizePool || 0,
      prizeDistribution: data.prizeDistribution || [0, 0, 0],
    },
  });

  const watchedPrizePool = watch("prizePool");
  const watchedDistribution = watch("prizeDistribution");

  const [totalPrize, setTotalPrize] = useState(0);

  const addWinner = () => {
    if (watchedDistribution && watchedDistribution.length < 10) {
      setValue("prizeDistribution", [...watchedDistribution, 0]);
      setTotalPrize(
        watchedDistribution.reduce((sum, amount) => sum + amount, 0),
      );
    }
  };

  const removeWinner = () => {
    if (watchedDistribution && watchedDistribution.length > 1) {
      setValue("prizeDistribution", watchedDistribution.slice(0, -1));
      setTotalPrize(
        watchedDistribution.reduce((sum, amount) => sum + amount, 0),
      );
    }
  };

  const updateAmount = (index: number, amount: number) => {
    const newDistribution = [...(watchedDistribution || [])];
    newDistribution[index] = amount;
    setValue("prizeDistribution", newDistribution);
    setTotalPrize(newDistribution.reduce((sum, amount) => sum + amount, 0));
  };

  const onSubmit = () => {
    if (!brand) return;

    const values = getValues();

    let assetsData: FormAssetItem[] | null =
      data.assets
        ?.filter(
          (asset) =>
            asset.file != null ||
            asset.url != null ||
            asset.description != null,
        )
        .map((asset) => ({
          file: asset.file || null,
          url: asset.url || null,
          description: asset.description || null,
        })) || null;

    let inspirationData:
      | Omit<InspirationItem, "id" | "created_at" | "brand_id" | "contest_id">[]
      | null =
      data.inspirations
        ?.filter(
          (inspiration) =>
            inspiration.url != null || inspiration.description != null,
        )
        .map((inspiration) => ({
          url: inspiration.url || null,
          description: inspiration.description || null,
        })) || null;

    const completeData = {
      title: data.title || "",
      category: data.category || "",
      description: data.description || "",
      requirements: data.requirements || "",
      application_start_date: data.applicationStartDate || "",
      application_end_date: data.applicationEndDate || "",
      contest_start_date: data.contestStartDate || "",
      contest_end_date: data.contestEndDate || "",
      prize_pool: values.prizePool || 0,
      prize_distribution: values.prizeDistribution || [],
    };

    if (!data.thumbnailFile) return;

    createContest(
      {
        brandId: brand.id,
        contestData: completeData,
        thumbnailFile: data.thumbnailFile,
        assetsData: assetsData,
        inspirationData: inspirationData,
      },
      {
        onSuccess: () => {
          router.push("/contests");
        },
      },
    );
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-base font-medium text-gray-700 mb-4">総賞金額</h3>

        <Controller
          control={control}
          name="prizePool"
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
                        field.onChange(option.value);
                      }}
                    />
                    <span className="flex flex-col items-center w-full justify-center">
                      <svg
                        className={`w-6 h-6 ${option.textColor}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                      </svg>
                      <span className="block text-sm font-medium text-gray-900">
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
                disabled={
                  watchedDistribution && watchedDistribution.length >= 10
                }
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{
                  backgroundColor:
                    watchedDistribution && watchedDistribution.length >= 10
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Controller
            control={control}
            name="prizeDistribution"
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
                            const newDistribution = [
                              ...(watchedDistribution || []),
                            ];
                            newDistribution[index] = Number(e);
                            setValue("prizeDistribution", newDistribution);
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

          {watchedPrizePool && totalPrize !== watchedPrizePool && (
            <p className="text-sm text-red-500 mt-6">
              配分金額の合計（{totalPrize.toLocaleString()}
              円）が選択した総賞金額（{watchedPrizePool.toLocaleString()}
              円）と一致しません
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        {/* <Button type="button" variant="secondary">
          下書き保存
        </Button> */}

        <Button type="button" onClick={back} variant="secondary">
          前へ戻る
        </Button>

        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? "作成中..." : "コンテストを作成"}
        </Button>
      </div>
    </div>
  );
}
