"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui-elements/form/FormField";
import { FileUpload } from "@/components/ui-elements/form/FileUpload";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type ImageItem = {
  url: string;
  file?: File;
};

type MultiImageUploadFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  handleSubmit: (file: File | null) => void;
  handleDelete: (index: number) => void;
  images: ImageItem[];
  maxImages?: number;
  disabled?: boolean;
};

/**
 * 複数画像アップロード対応のフィールドコンポーネント
 * デフォルトで最大5枚まで
 */
export function MultiImageUploadField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  handleSubmit,
  handleDelete,
  images,
  maxImages = 5,
  disabled = false,
}: MultiImageUploadFieldProps<T>) {
  const canUploadMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name={name}
        render={({ fieldState }) => (
          <FormField
            label={`${label}（${images.length}/${maxImages}枚）`}
            required
            error={fieldState.error?.message}
          >
            {canUploadMore ? (
              <FileUpload
                handleSubmit={handleSubmit}
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                className="w-full"
                disabled={disabled}
              />
            ) : (
              <p className="text-sm text-gray-500">
                最大{maxImages}枚までアップロード可能です
              </p>
            )}
          </FormField>
        )}
      />

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image.url}
                alt={`画像 ${index + 1}`}
                width={160}
                height={90}
                className="w-full aspect-video object-cover rounded-lg border border-gray-200"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={disabled}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
