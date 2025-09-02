import * as yup from "yup";

export const brandCreateSchema = yup.object().shape({
  name: yup.string().required("ブランド名を入力してください"),

  website: yup
    .string()
    .url("正しいURLを入力してください")
    .nullable()
    .default(null),

  description: yup
    .string()
    .max(240, "ブランド紹介は240文字以内で入力してください")
    .nullable()
    .default(null),

  tiktok_username: yup.string().nullable().default(null),

  instagram_url: yup
    .string()
    .nullable()
    .default(null)
    .url("正しいURLを入力してください"),
});
