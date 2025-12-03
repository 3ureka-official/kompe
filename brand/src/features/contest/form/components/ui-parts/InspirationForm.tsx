import { Controller, useForm } from "react-hook-form";
import { FormField } from "@/components/ui-elements/form/FormField";
import { Input } from "@/components/ui-elements/form/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { inspirationItemSchema } from "@/features/contest/form/schemas/createContestSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  addInspiration: (
    inspiration: yup.InferType<typeof inspirationItemSchema>,
  ) => void;
};

export function InspirationForm({ addInspiration }: Props) {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(inspirationItemSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(
    (value: yup.InferType<typeof inspirationItemSchema>) => {
      addInspiration(value);
      reset();
    },
  );

  return (
    <div className="flex flex-col rounded">
      <Controller
        control={control}
        name="url"
        render={({ field, fieldState }) => (
          <FormField label="URL" error={fieldState.error?.message}>
            <Input
              {...field}
              placeholder="TikTok、YouTube等のURL"
              className="mb-2"
            />
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
              placeholder="このインスピレーションについての説明"
              rows={3}
              className="mb-2"
            />
          </FormField>
        )}
      />

      <div className="flex justify-end">
        <Button type="button" variant="default" onClick={onSubmit}>
          このインスピレーションを追加
        </Button>
      </div>
    </div>
  );
}
