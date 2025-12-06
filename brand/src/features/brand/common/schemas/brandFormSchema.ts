import * as yup from "yup";

export const brandFormSchema = yup.object().shape({
  name: yup.string().required("ブランド名を入力してください"),

  website: yup
    .string()
    .url("正しいURLを入力してください")
    .default("")
    .nullable()
    .matches(
      /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
      "正しいWebサイトURLを入力してください",
    ),

  description: yup
    .string()
    .max(240, "ブランド紹介は240文字以内で入力してください")
    .default(""),

  tiktok_username: yup
    .string()
    .default("")
    .nullable()
    .matches(/^@[a-zA-Z0-9_]+$/, "正しいTikTokユーザー名を入力してください"),

  instagram_url: yup
    .string()
    .default("")
    .url("正しいURLを入力してください")
    .nullable()
    .matches(
      /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+$/,
      "正しいInstagram URLを入力してください",
    ),
});

export type BrandFormData = yup.InferType<typeof brandFormSchema>;
