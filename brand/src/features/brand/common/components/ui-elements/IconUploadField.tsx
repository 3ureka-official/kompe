import { FormField } from "@/components/ui-elements/form/FormField";
import { IconUploadButton } from "./IconUploadButton";

type IconUploadFieldProps = {
  label: string;
  preview: string | null;
  onFileChange: (file: File | null) => void;
  onPreviewChange: (preview: string | null) => void;
};

export function IconUploadField({
  label,
  preview,
  onFileChange,
  onPreviewChange,
}: IconUploadFieldProps) {
  return (
    <FormField label={label}>
      <IconUploadButton
        onFileChange={onFileChange}
        onPreviewChange={onPreviewChange}
        preview={preview}
        className="w-full"
      />
    </FormField>
  );
}
