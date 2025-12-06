"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PREFECTURES } from "@/constants/prefectures";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

type AddressFormData = {
  postal_code: string;
  prefecture: string;
  city: string;
  address_line: string;
};

type AddressFormProps = {
  initialData?: AddressFormData | null;
  onSubmit: (data: AddressFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
};

export default function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "保存",
  cancelLabel = "キャンセル",
}: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    postal_code: initialData?.postal_code || "",
    prefecture: initialData?.prefecture || "",
    city: initialData?.city || "",
    address_line: initialData?.address_line || "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressFormData, string>> = {};

    if (!formData.postal_code.trim()) {
      newErrors.postal_code = "郵便番号を入力してください";
    } else {
      const postalCodeRegex = /^\d{3}-?\d{4}$/;
      if (!postalCodeRegex.test(formData.postal_code.replace(/-/g, ""))) {
        newErrors.postal_code =
          "郵便番号の形式が正しくありません（例: 123-4567）";
      }
    }

    if (!formData.prefecture) {
      newErrors.prefecture = "都道府県を選択してください";
    }

    if (!formData.city.trim()) {
      newErrors.city = "市区町村を入力してください";
    }

    if (!formData.address_line.trim()) {
      newErrors.address_line = "番地・建物名を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("住所の保存に失敗しました:", error);
      // エラーは親コンポーネントで処理される想定
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d-]/g, "");
    // ハイフンを自動挿入
    if (value.length > 3 && !value.includes("-")) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    }
    setFormData({ ...formData, postal_code: value });
    if (errors.postal_code) {
      setErrors({ ...errors, postal_code: undefined });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="postal_code">
          郵便番号 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="postal_code"
          type="text"
          placeholder="123-4567"
          value={formData.postal_code}
          onChange={handlePostalCodeChange}
          maxLength={8}
          aria-invalid={!!errors.postal_code}
        />
        {errors.postal_code && (
          <p className="text-sm text-destructive">{errors.postal_code}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="prefecture">
          都道府県 <span className="text-destructive">*</span>
        </Label>
        <NativeSelect
          id="prefecture"
          value={formData.prefecture}
          onChange={(e) => {
            setFormData({ ...formData, prefecture: e.target.value });
            if (errors.prefecture) {
              setErrors({ ...errors, prefecture: undefined });
            }
          }}
          aria-invalid={!!errors.prefecture}
        >
          <NativeSelectOption value="">選択してください</NativeSelectOption>
          {PREFECTURES.map((pref) => (
            <NativeSelectOption key={pref} value={pref}>
              {pref}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {errors.prefecture && (
          <p className="text-sm text-destructive">{errors.prefecture}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">
          市区町村 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="city"
          type="text"
          placeholder="渋谷区"
          value={formData.city}
          onChange={(e) => {
            setFormData({ ...formData, city: e.target.value });
            if (errors.city) {
              setErrors({ ...errors, city: undefined });
            }
          }}
          aria-invalid={!!errors.city}
        />
        {errors.city && (
          <p className="text-sm text-destructive">{errors.city}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_line">
          番地・建物名 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address_line"
          type="text"
          placeholder="1-2-3 ビル名"
          value={formData.address_line}
          onChange={(e) => {
            setFormData({ ...formData, address_line: e.target.value });
            if (errors.address_line) {
              setErrors({ ...errors, address_line: undefined });
            }
          }}
          aria-invalid={!!errors.address_line}
        />
        {errors.address_line && (
          <p className="text-sm text-destructive">{errors.address_line}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-input rounded-md hover:bg-accent"
            disabled={isSubmitting}
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "保存中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
