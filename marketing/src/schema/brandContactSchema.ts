import { z } from "zod";

export const brandContactSchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .max(50, "お名前は50文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  message: z
    .string()
    .max(1000, "メッセージは1000文字以内で入力してください")
    .optional(),
  inquiryType: z.enum(["self_introduction", "consultation"]),
});

export type BrandContactFormData = z.infer<typeof brandContactSchema>;
