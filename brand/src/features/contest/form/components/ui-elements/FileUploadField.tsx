"use client";

import { useState } from "react";
import { formatFileSize } from "@/utils/format";
import { Control, Controller } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui-elements/form/FormField";
import { FileUpload } from "@/components/ui-elements/form/FileUpload";
import Image from "next/image";

type FileUploadFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  handleSubmit: (file: File | null) => void;
  handleDelete: () => void;
  selectedFileUrl: string | null;
  hasSelected: boolean;
};

export function FileUploadField({
  control,
  name,
  label,
  handleSubmit,
  selectedFileUrl,
  hasSelected,
  handleDelete,
}: FileUploadFieldProps) {
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
              disabled={hasSelected}
            />
          </FormField>
        )}
      />
      {hasSelected && (
        <div className="flex justify-between items-center">
          <Image
            src={selectedFileUrl || ""}
            alt="thumbnail"
            width={160}
            height={100}
            className="w-[160px] h-[100px] object-cover"
          />
          <Button type="button" variant="destructive" onClick={handleDelete}>
            削除
          </Button>
        </div>
      )}
    </>
  );
}
