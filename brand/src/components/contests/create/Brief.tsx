import { Button } from '@/components/ui/Button';
import { RichTextEditor } from '@/components/ui/RichTextEditer';
import { useContext } from 'react';
import { CreateContestContext } from '@/contexts/CreateContestContext';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { briefSchema } from '@/schema/contestCreateSchema';
import { FormField } from '@/components/ui/FormField';

export function Brief() {
  const { data, next, back } = useContext(CreateContestContext);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(briefSchema),
    mode: 'onSubmit',
    defaultValues: {
      description: data.description || '',
      requirements: data.requirements || '',
    },
  });

  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Project Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">プロジェクト概要</h3>
          
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <FormField label="プロジェクト概要" error={fieldState.error?.message}>
                <RichTextEditor 
                  value={field.value || ''} 
                  onChange={(html) => field.onChange(html)}   
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
                  value={field.value || ''} 
                  onChange={(html) => field.onChange(html)}   
                />
              </FormField>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        {/* <Button
          type="button"
          variant="secondary"
        >
          下書き保存
        </Button> */}

        <Button
          type="button"
          onClick={back}
          variant="secondary"
        >
          前へ戻る
        </Button>

        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit(next)}
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
} 