"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui-elements/form/FormField";
import { FileUpload } from "@/components/ui-elements/form/FileUpload";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type ImageUploadFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  handleSubmit: (file: File | null) => void;
  handleDelete: () => void;
  selectedFileUrl: string | null;
  hasSelected: boolean;
  disabled: boolean;
};

export function ImageUploadField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  handleSubmit,
  selectedFileUrl,
  hasSelected,
  handleDelete,
  disabled,
}: ImageUploadFieldProps<T>) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ fieldState }) => (
          <FormField label={label} required error={fieldState.error?.message}>
            <FileUpload
              handleSubmit={handleSubmit}
              accept="image/*"
              maxSize={5 * 1024 * 1024}
              className="w-full"
              disabled={disabled}
            />
          </FormField>
        )}
      />
      {hasSelected && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="relative group">
            <Image
              src={selectedFileUrl || ""}
              alt="thumbnail"
              width={160}
              height={90}
              className="w-full aspect-video object-cover rounded-lg border border-gray-200"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-opacity"
              disabled={disabled}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
