import { Button } from "@/components/ui/Button";
import { useContext, useEffect } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { briefSchema } from "@/schema/createContestSchema";
import { FormField } from "@/components/ui/FormField";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";

export function Brief() {
  const { data, next, back, submit, isUpdating, updateData } =
    useContext(CreateContestContext);
  const { control, handleSubmit, getValues, reset, watch } = useForm({
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

  const requiresPurchaseProof = watch("requires_purchase_proof");

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

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <FormField
              label="コンテスト概要"
              required
              error={fieldState.error?.message}
            >
              <Textarea
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="例：コンテストを通じた新作の認知・購入促進を目的としています。"
              />
            </FormField>
          )}
        />
      </div>

      <div className="flex flex-col gap-4 bg-white rounded-lg p-8 shadow-sm">
        <Controller
          control={control}
          name="requirements"
          render={({ field, fieldState }) => (
            <FormField
              label="動画の条件"
              required
              error={fieldState.error?.message}
            >
              <Textarea
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="例：新作のパンツを着用したコーデを撮影してください。"
              />
            </FormField>
          )}
        />
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
          variant="default"
          onClick={handleSubmit(next)}
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "次へ進む"}
        </Button>
      </div>
    </div>
  );
}
