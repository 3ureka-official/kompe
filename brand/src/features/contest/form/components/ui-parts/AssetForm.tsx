import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { UrlField } from "@/components/ui-elements/form/UrlField";
import { TextareaField } from "@/components/ui-elements/form/TextareaField";
import { assetFormSchema } from "@/features/contest/form/schemas/createContestSchema";
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
      <div className="mb-4">
        <UrlField
          control={control}
          name="url"
          label="URL"
          required
          placeholder="外部リンク URL"
        />
      </div>

      <TextareaField
        control={control}
        name="description"
        label="説明"
        required
        placeholder="説明をここに追加"
        rows={3}
      />

      <div className="flex justify-end">
        <Button type="button" variant="default" onClick={onSubmit}>
          このアセットを追加
        </Button>
      </div>
    </div>
  );
}
