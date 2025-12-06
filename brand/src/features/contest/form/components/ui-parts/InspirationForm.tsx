import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  InspirationItemFormData,
  inspirationItemSchema,
} from "@/features/contest/form/schemas/inspirationItemSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { UrlField } from "@/components/ui-elements/form/UrlField";
import { TextareaField } from "@/components/ui-elements/form/TextareaField";

type Props = {
  addInspiration: (inspiration: InspirationItemFormData) => void;
};

export function InspirationForm({ addInspiration }: Props) {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(inspirationItemSchema),
    mode: "onChange",
    defaultValues: inspirationItemSchema.cast({}),
  });

  const onSubmit = handleSubmit((value: InspirationItemFormData) => {
    addInspiration(value);
    reset();
  });

  return (
    <div className="flex flex-col gap-4">
      <UrlField
        control={control}
        name="url"
        label="URL"
        placeholder="TikTok、YouTube等のURL"
      />

      <TextareaField
        control={control}
        name="description"
        label="説明"
        placeholder="この参考動画についての説明"
        rows={3}
      />

      <div className="flex justify-end">
        <Button type="button" variant="default" onClick={onSubmit}>
          この参考動画を追加
        </Button>
      </div>
    </div>
  );
}
