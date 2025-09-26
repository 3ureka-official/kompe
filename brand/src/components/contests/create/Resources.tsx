"use client";

import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import {
  assetFormSchema,
  inspirationItemSchema,
  resourcesSchema,
} from "@/schema/createContestSchema";
import { AssetForm } from "@/components/contests/create/AssetForm";
import * as yup from "yup";
import { InspirationForm } from "./InspirationForm";
import { v4 as uuidv4 } from "uuid";
import { Trash2, Link } from "lucide-react";

export function Resources() {
  const { next, back, data, submit, isUpdating } =
    useContext(CreateContestContext);

  const { handleSubmit, getValues, setValue, watch, reset } = useForm({
    resolver: yupResolver(resourcesSchema),
    mode: "onSubmit",
    defaultValues: {
      assets: data.assets ?? [],
      inspirations: data.inspirations ?? [],
    },
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const watchedAssets = watch("assets");
  const watchedInspirations = watch("inspirations");

  const addAsset = (asset: yup.InferType<typeof assetFormSchema>) => {
    const assets = getValues("assets") || [];
    assets.push({
      id: uuidv4(),
      url: asset.url,
      description: asset.description,
    });
    setValue("assets", assets);
  };

  const removeAsset = (idx: number) => {
    const asset = getValues("assets")?.[idx];
    if (!asset) return;

    const assets = getValues("assets")?.filter((_, i) => i !== idx);
    setValue("assets", assets);
  };

  const addInspiration = (
    inspiration: yup.InferType<typeof inspirationItemSchema>,
  ) => {
    const inspirationId = uuidv4();
    const inspirations = getValues("inspirations") || [];
    inspirations.push({
      id: inspirationId,
      url: inspiration.url,
      description: inspiration.description,
    });
    setValue("inspirations", inspirations);
  };

  const removeInspiration = (idx: number) => {
    const inspiration = getValues("inspirations")?.[idx];
    if (!inspiration) return;

    const inspirations = getValues("inspirations")?.filter((_, i) => i !== idx);
    setValue("inspirations", inspirations);
  };

  const draft = () => {
    const values = getValues();
    submit(true, values);
  };

  return (
    <div>
      {/* Assets セクション */}
      <div className="mb-8 bg-white rounded-lg p-8 ">
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-lg font-medium text-gray-900">動画素材</h3>
          <p className="text-sm text-gray-500">
            Google Drive の URL を入力してください
          </p>
        </div>
        <AssetForm addAsset={addAsset} />

        {watchedAssets && watchedAssets.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {watchedAssets.map((asset, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50 gap-4 relative"
              >
                {/* 削除ボタン */}
                <Button
                  type="button"
                  onClick={() => removeAsset(idx)}
                  variant="destructive"
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                {/* URL */}
                {asset.url && (
                  <div className="text-sm rounded h-30 w-30 bg-gray-100 border border-gray-200 flex items-center justify-center gap-2">
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Link className="w-10 h-10 flex-shrink-0" />
                    </a>
                  </div>
                )}

                {/* 説明 */}
                {asset.description && (
                  <div className="text-sm h-10 rounded overflow-hidden line-clamp-2">
                    {asset.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inspiration セクション */}
      <div className="mb-8 bg-white rounded-lg p-8">
        <h3 className="text-lg  font-medium text-gray-900 mb-6">
          インスピレーション
        </h3>
        <InspirationForm addInspiration={addInspiration} />

        {watchedInspirations && watchedInspirations.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {watchedInspirations.map((inspiration, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50 gap-4 relative"
              >
                {/* 削除ボタン */}
                <Button
                  type="button"
                  onClick={() => removeInspiration(idx)}
                  variant="destructive"
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                {inspiration.url && (
                  <div className="text-sm break-all rounded h-30 w-30 bg-gray-100 border border-gray-200 flex items-center justify-center gap-2">
                    <a
                      href={inspiration.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Link className="w-10 h-10 flex-shrink-0" />
                    </a>
                  </div>
                )}

                {inspiration.description && (
                  <div className="text-sm h-10 rounded overflow-hidden line-clamp-2">
                    {inspiration.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ナビゲーションボタン */}
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
          variant="secondary"
          onClick={() => back(getValues())}
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "前へ戻る"}
        </Button>

        <Button
          type="button"
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
