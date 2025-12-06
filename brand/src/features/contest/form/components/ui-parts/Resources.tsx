"use client";

import React from "react";
import { AssetForm } from "@/features/contest/form/components/ui-parts/AssetForm";
import { InspirationForm } from "@/features/contest/form/components/ui-parts/InspirationForm";
import { useResources } from "@/features/contest/form/hooks/useResources";
import { ActionButtons } from "./ActionButtons";
import { ResourceCard } from "@/features/contest/form/components/ui-elements/ResourceCard";

export function Resources() {
  const {
    watchedAssets,
    watchedInspirations,
    isPending,
    addAsset,
    removeAsset,
    addInspiration,
    removeInspiration,
    handleDraft,
    handleNext,
    handleBack,
  } = useResources();

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
              <ResourceCard
                key={idx}
                url={asset.url}
                description={asset.description}
                onDelete={() => removeAsset(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Inspiration セクション */}
      <div className="mb-8 bg-white rounded-lg p-8">
        <h3 className="text-lg  font-medium text-gray-900 mb-6">参考動画</h3>
        <InspirationForm addInspiration={addInspiration} />

        {watchedInspirations && watchedInspirations.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {watchedInspirations.map((inspiration, idx) => (
              <ResourceCard
                key={idx}
                url={inspiration.url}
                description={inspiration.description}
                onDelete={() => removeInspiration(idx)}
              />
            ))}
          </div>
        )}
      </div>

      <ActionButtons
        isLoading={isPending}
        handleDraft={handleDraft}
        handleBack={handleBack}
        handleNext={handleNext}
        needSubmitButton={false}
      />
    </div>
  );
}
