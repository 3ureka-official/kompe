import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/contests/create/ui/RichTextEditer/RichTextEditer";
import { useContext } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { briefSchema } from "@/schema/createContestSchema";
import { FormField } from "@/components/ui/FormField";

export function Brief() {
  const { data, next, back, submit, isUpdating, updateData } =
    useContext(CreateContestContext);
  const { control, handleSubmit, getValues, watch } = useForm({
    resolver: yupResolver(briefSchema),
    mode: "onSubmit",
    defaultValues: {
      description: data.description || "",
      requirements: data.requirements || "",
    },
  });

  const draft = () => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Project Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            プロジェクト概要
          </h3>

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <FormField
                label="プロジェクト概要"
                error={fieldState.error?.message}
              >
                <RichTextEditor
                  value={field.value || ""}
                  onChange={(md) => field.onChange(md)}
                />
              </FormField>
            )}
          />
        </div>

        {/* Set rules */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">ルール設定</h3>

          <Controller
            control={control}
            name="requirements"
            render={({ field, fieldState }) => (
              <FormField label="ルール設定" error={fieldState.error?.message}>
                <RichTextEditor
                  value={field.value || ""}
                  onChange={(md) => field.onChange(md)}
                />
              </FormField>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
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
          onClick={handleSubmit(next)}
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "次へ進む"}
        </Button>
      </div>
    </div>
  );
}
