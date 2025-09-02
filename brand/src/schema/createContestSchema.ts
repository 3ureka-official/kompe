import * as yup from "yup";

// ステップごとのスキーマ
export const basicInfoSchema = yup.object().shape({
  title: yup.string().required("タイトルを入力してください"),
  thumbnail_url: yup.string().required("サムネイルを選択してください"),

  contest_start_date: yup.date().required("開催開始日を選択してください"),
  contest_end_date: yup
    .date()
    .required("開催終了日を選択してください")
    .min(
      yup.ref("contest_start_date"),
      "開催終了日は開始日より後にしてください",
    ),
});

export const briefSchema = yup.object().shape({
  description: yup.string().required("説明を入力してください"),
  supply_of_samples: yup
    .string()
    .required("試供品の負担についてを入力してください"),
  video_conditions: yup.string().required("動画の条件を入力してください"),
});

export const assetFormSchema = yup.object().shape({
  url: yup.string().url("URL 形式で入力してください"),
  description: yup.string().required("説明を入力してください"),
});

export const assetItemSchema = yup.object().shape({
  id: yup.string(),
  url: yup.string().url("URL 形式で入力してください"),
  description: yup.string().required("説明を入力してください"),
});

export const inspirationItemSchema = yup.object().shape({
  id: yup.string(),
  url: yup
    .string()
    .url("URL 形式で入力してください")
    .required("URL を入力してください"),
  description: yup.string().required("説明を入力してください"),
});

export const resourcesSchema = yup.object().shape({
  assets: yup.array().of(assetItemSchema).min(0),
  inspirations: yup.array().of(inspirationItemSchema).min(0),
});

export const prizeSchema = yup.object().shape({
  prize_pool: yup
    .number()
    .min(1000, "賞金額を選択してください")
    .required("賞金額を選択してください"),

  prize_distribution: yup
    .array(yup.number().min(0).required("報酬配分を設定してください"))
    .test(
      "total-matches-pool",
      "配分金額の合計が総賞金額と一致しません",
      function (value) {
        const { prize_pool } = this.parent;
        if (!value || !prize_pool) return true;
        const total = value.reduce(
          (sum: number, amount?: number) => sum + (amount || 0),
          0,
        );
        return total === prize_pool;
      },
    )
    .required("報酬配分を設定してください"),
});

export type ContestCreateFormData = yup.InferType<typeof basicInfoSchema> &
  yup.InferType<typeof briefSchema> &
  yup.InferType<typeof resourcesSchema> &
  yup.InferType<typeof prizeSchema>;
