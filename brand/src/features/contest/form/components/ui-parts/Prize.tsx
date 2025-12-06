import { Button } from "@/components/ui/Button";
import { Controller } from "react-hook-form";
import { NumberInput } from "@/components/ui-elements/form/NumberInput";
import { FormNumberField } from "@/components/ui-elements/form/NumberField";
import { MinusIcon, PlusIcon } from "lucide-react";
import { usePrize } from "@/features/contest/form/hooks/usePrize";
import { ActionButtons } from "./ActionButtons";

export function Prize() {
  const {
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
  } = usePrize();

  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <FormNumberField
              control={control}
              name="prize_pool"
              label="総賞金額"
              required
              step={1000}
              min={50000}
            />
          </div>
          <span className="text-sm text-gray-700 pt-6">円</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm my-8">
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

      <ActionButtons
        isLoading={isPending}
        handleDraft={handleDraft}
        handleBack={handleBack}
        handleSubmit={handlePublish}
        needNextButton={false}
      />
    </div>
  );
}
