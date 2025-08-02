'use client';

import React, { useContext } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { FileUpload } from '@/components/ui/FileUpload';
import { FormField } from '@/components/ui/FormField';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateContestContext } from '@/contexts/CreateContestContext';
import { resourcesSchema } from '@/schema/contestCreateSchema';

export function Resources() {
  const { next, back, data } = useContext(CreateContestContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resourcesSchema),
    mode: 'onSubmit',
    defaultValues: {
      assets: data.assets ?? [{
        file: null,
        filePreview: null,
        url: null,
        description: null,
      }],
      inspirations: data.inspirations ?? [{
        url: null,
        description: null,
      }],
    },
  });

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      {/* Assets セクション */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">アセット</h3>

        <Controller
          control={control}
          name="assets"
          render={({ field }) => {
            const assets = field.value || [];

            return (
              <>
                {assets.map((asset, idx) => (
                  <div key={idx} className="flex flex-col gap-2 mb-6 border p-4 rounded">
                    <FormField
                      label={`アセット ${idx + 1}`}
                      error={errors.assets?.[idx]?.message}
                    >
                      <FileUpload
                        file={field.value?.[idx]?.file || null}
                        preview={field.value?.[idx]?.filePreview || null}
                        onFileChange={(file) =>{
                          field.onChange(
                            assets.map((a, i) =>
                              i === idx ? { ...a, file: file || null } : a
                            )
                          )
                        }}
                        onPreviewChange={(filePreview) => {
                          field.onChange(
                            assets.map((a, i) =>
                              i === idx ? { ...a, filePreview: filePreview || null } : a
                            )
                          )
                        }}
                        accept="image/*"
                        maxSize={5 * 1024 * 1024}
                        className="w-full mb-4"
                      />
                    </FormField>

                    <div className="flex items-center justify-center mb-2">or</div>

                    <FormField label="URL" error={errors.assets?.[idx]?.url?.message}>
                      <Input
                        value={field.value?.[idx]?.url || ''}
                        placeholder="外部リンク URL"
                        onChange={(e) =>
                          field.onChange(
                            assets.map((a, i) =>
                              i === idx ? { ...a, url: e, file: null } : a
                            )
                          )
                        }
                        className="mb-4"
                      />
                    </FormField>

                    <FormField label="説明" error={errors.assets?.[idx]?.description?.message}>
                      <Textarea
                        value={asset.description || ''}
                        onChange={(e) =>
                          field.onChange(
                            assets.map((a, i) =>
                              i === idx ? { ...a, description: e.target.value } : a
                            )
                          )
                        }
                        placeholder="説明をここに追加"
                        rows={3}
                        className="w-full border rounded p-2"
                      />
                    </FormField>
                  </div>
                ))}

                {/* アセット追加ボタン */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      field.onChange([
                        ...assets,
                        { file: null, url: '', description: '' },
                      ])
                    }
                  >
                    追加
                  </Button>
                </div>
              </>
            );
          }}
        />
      </div>

      {/* Inspiration セクション */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">インスピレーション</h3>
        <Controller
          control={control}
          name="inspirations"
          render={({ field }) => {
            const inspirations = field.value || [];

            return (
              <>
              {inspirations.map((inspiration, idx) => (
                <div key={idx} className="flex flex-col gap-4 mb-6 border p-4 rounded"> 
                  <FormField label="URL" error={errors.inspirations?.[idx]?.url?.message}>
                    <Input
                      placeholder="URL"
                      value={inspiration.url || ''}
                      onChange={(e) =>
                        field.onChange(
                          inspirations.map((a, i) =>
                            i === idx ? { ...a, url: e } : a
                          )
                        )
                      }
                    />
                  </FormField>

                  <FormField label="説明" error={errors.inspirations?.[idx]?.description?.message}>
                    <Textarea
                      placeholder="説明をここに追加"
                      rows={3}
                      value={inspiration.description || ''}
                      onChange={(e) =>
                        field.onChange(
                          inspirations.map((a, i) =>
                            i === idx ? { ...a, description: e.target.value } : a
                          )
                        )
                      }
                    />
                  </FormField>
                </div>
              ))}
              <div className="flex justify-end">
                <Button 
                type="button" 
                variant="secondary"
                onClick={() =>
                  field.onChange([
                    ...inspirations,
                    { url: '', description: '' },
                  ])
                }>
                  追加
                </Button>
              </div>
              </>
          );
          }}
        />
        
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-end gap-4 pt-6">
        <Button type="button" variant="secondary" onClick={back}>
          前へ戻る
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit(next)}
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
}
