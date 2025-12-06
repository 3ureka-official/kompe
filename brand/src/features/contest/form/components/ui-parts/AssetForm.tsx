import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { UrlField } from "@/components/ui-elements/form/UrlField";
import { TextareaField } from "@/components/ui-elements/form/TextareaField";
import {
  AssetItemFormData,
  assetItemSchema,
} from "@/features/contest/form/schemas/assetItemSchema";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  addAsset: (value: AssetItemFormData) => void;
};

export function AssetForm({ addAsset }: Props) {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(assetItemSchema),
    mode: "onSubmit",
    defaultValues: assetItemSchema.cast({}),
  });

  const onSubmit = handleSubmit((value: AssetItemFormData) => {
    addAsset(value);
    reset();
  });

  return (
    <div className="flex flex-col gap-4">
      <UrlField
        control={control}
        name="url"
        label="URL"
        placeholder="外部リンク URL"
      />

      <TextareaField
        control={control}
        name="description"
        label="説明"
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
