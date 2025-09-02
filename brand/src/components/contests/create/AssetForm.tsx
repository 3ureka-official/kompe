import { Button } from "@/components/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { assetFormSchema } from "@/schema/createContestSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  addAsset: (value: yup.InferType<typeof assetFormSchema>) => void;
};

export function AssetForm({ addAsset }: Props) {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(assetFormSchema),
    mode: "onSubmit",
    defaultValues: {
      url: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(
    (value: yup.InferType<typeof assetFormSchema>) => {
      addAsset(value);
      reset();
    },
  );

  return (
    <div className="flex flex-col">
      <Controller
        control={control}
        name="url"
        render={({ field, fieldState }) => (
          <FormField label="URL" error={fieldState.error?.message}>
            <Input {...field} placeholder="外部リンク URL" className="mb-4" />
          </FormField>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <FormField label="説明" error={fieldState.error?.message}>
            <Textarea
              {...field}
              placeholder="説明をここに追加"
              rows={3}
              className="w-full border rounded p-2"
            />
          </FormField>
        )}
      />

      <div className="flex justify-end">
        <Button type="button" variant="primary" onClick={onSubmit}>
          このアセットを追加
        </Button>
      </div>
    </div>
  );
}
