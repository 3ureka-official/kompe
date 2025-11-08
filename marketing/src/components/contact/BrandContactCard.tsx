"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  brandContactSchema,
  type BrandContactFormData,
} from "@/schema/brandContactSchema";
import { ZodError } from "zod";
import { cn } from "@/lib/utils";

export function BrandContactCard() {
  const [formData, setFormData] = useState<BrandContactFormData>({
    name: "",
    email: "",
    message: "",
    inquiryType: "self_introduction",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BrandContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // エラーをクリア
    if (errors[name as keyof BrandContactFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleRadioChange = (value: "self_introduction" | "consultation") => {
    setFormData({
      ...formData,
      inquiryType: value,
    });
    if (errors.inquiryType) {
      setErrors({
        ...errors,
        inquiryType: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // zodでバリデーション
      const result = brandContactSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: Partial<Record<keyof BrandContactFormData, string>> =
          {};
        const zodError = result.error as ZodError;
        zodError.issues.forEach((issue) => {
          const field = issue.path[0] as keyof BrandContactFormData;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      // APIエンドポイントに送信
      const response = await fetch("/api/contact/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "送信に失敗しました");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
        inquiryType: "self_introduction",
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 xl:py-20 md:px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-5 md:mb-12">
        <h1 className="text-xl md:text-3xl xl:text-4xl font-bold text-black mb-4">
          お問い合わせ
        </h1>
      </div>
      <div className="container mx-auto max-w-4xl md:border-2 md:border-gray-200 rounded-2xl">
        <div className="bg-white rounded-2xl px-8 py-4 md:p-8 xl:p-12 md:shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm md:text-base xl:text-lg font-semibold text-gray-700 mb-2">
                要件 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inquiryType"
                    value="self_introduction"
                    checked={formData.inquiryType === "self_introduction"}
                    onChange={() => handleRadioChange("self_introduction")}
                    className="w-4 h-4 text-[#FF0050] border-gray-300"
                  />
                  <span className="ml-3 text-sm md:text-base text-gray-700">
                    自社導入したい
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inquiryType"
                    value="consultation"
                    checked={formData.inquiryType === "consultation"}
                    onChange={() => handleRadioChange("consultation")}
                    className="w-4 h-4 text-[#FF0050] border-gray-300"
                  />
                  <span className="ml-3 text-sm md:text-base text-gray-700">
                    話を聞きたい
                  </span>
                </label>
              </div>
              {errors.inquiryType && (
                <p className="mt-1 text-red-500 text-xs md:text-sm">
                  {errors.inquiryType}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm md:text-base xl:text-lg font-semibold text-gray-700 mb-2"
              >
                お名前 <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  "w-full text-sm md:text-base",
                  errors.name && "border-red-500",
                )}
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-xs md:text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm md:text-base xl:text-lg font-semibold text-gray-700 mb-2"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full text-sm md:text-base",
                  errors.email && "border-red-500",
                )}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-xs md:text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm md:text-base xl:text-lg font-semibold text-gray-700 mb-2"
              >
                メッセージ
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message || ""}
                onChange={handleChange}
                rows={5}
                className={cn(
                  "w-full text-sm md:text-base field-sizing-content min-h-30",
                  errors.message && "border-red-500",
                )}
                placeholder="お問い合わせ内容をご記入ください"
              />
              {errors.message && (
                <p className="mt-1 text-red-500 text-xs md:text-sm">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="pt-4 mb-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-[#FF0050] hover:bg-[#FE2C55] text-white text-sm md:text-base py-3 md:py-6 font-bold rounded-lg transition-colors"
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </Button>
            </div>

            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm md:text-base xl:text-base">
                お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm md:text-base xl:text-base">
                送信に失敗しました。しばらく時間をおいて再度お試しください。
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
