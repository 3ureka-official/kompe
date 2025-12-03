import * as yup from "yup";

// ステップごとのスキーマ
export const basicInfoSchema = yup.object().shape({
  title: yup.string().required("タイトルを入力してください"),
  thumbnail_url: yup.string().required("サムネイルを選択してください"),

  // 応募期間
  entry_start_date: yup.date().required("応募開始日を選択してください"),
  entry_end_date: yup
    .date()
    .required("応募終了日を選択してください")
    .min(yup.ref("entry_start_date"), "応募終了日は開始日より後にしてください"),

  // 動画制作期間
  video_production_start_date: yup
    .date()
    .required("動画制作開始日を選択してください"),
  video_production_end_date: yup
    .date()
    .required("動画制作終了日を選択してください")
    .min(
      yup.ref("video_production_start_date"),
      "動画制作終了日は開始日より後にしてください",
    ),

  // 開催期間
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
  requirements: yup.string().required("動画の条件を入力してください"),
  // 購入証明関連フィールド
  requires_purchase_proof: yup.boolean().default(false),
  purchase_product_name: yup
    .string()
    .nullable()
    .when("requires_purchase_proof", {
      is: true,
      then: (schema) => schema.required("対象商品名を入力してください"),
      otherwise: (schema) => schema.nullable(),
    }),
  purchase_product_url: yup
    .string()
    .nullable()
    .url("URL形式で入力してください"),
  purchase_description: yup.string().nullable(),
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
    .min(50000, "賞金額は50,000円以上を入力してください")
    .required("賞金額を入力してください")
    .default(50000),

  prize_distribution: yup
    .array(yup.number().min(0).required("報酬配分を設定してください"))
    .default([50000])
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

export const sampleProductSchema = yup.object().shape({
  product_name: yup.string().required("試供品の商品名を入力してください"),
  rental_or_purchase: yup
    .mixed<"RENTAL" | "PURCHASE">()
    .oneOf(["RENTAL", "PURCHASE"], "貸すか購入かを選択してください")
    .required("貸すか購入かを選択してください"),
  price_per_creator: yup
    .number()
    .min(0, "金額は0以上を入力してください")
    .required("1クリエイターあたりの金額を入力してください"),
  return_postal_code: yup
    .string()
    .nullable()
    .when("rental_or_purchase", {
      is: "RENTAL",
      then: (schema) => schema.required("郵便番号を入力してください"),
      otherwise: (schema) => schema.nullable(),
    }),
  return_prefecture: yup
    .string()
    .nullable()
    .when("rental_or_purchase", {
      is: "RENTAL",
      then: (schema) => schema.required("都道府県を入力してください"),
      otherwise: (schema) => schema.nullable(),
    }),
  return_city: yup
    .string()
    .nullable()
    .when("rental_or_purchase", {
      is: "RENTAL",
      then: (schema) => schema.required("市区町村を入力してください"),
      otherwise: (schema) => schema.nullable(),
    }),
  return_address_line: yup
    .string()
    .nullable()
    .when("rental_or_purchase", {
      is: "RENTAL",
      then: (schema) => schema.required("番地・建物名を入力してください"),
      otherwise: (schema) => schema.nullable(),
    }),
});

export const samplesSchema = yup.object().shape({
  has_sample: yup.boolean().default(false),
  sample_product_name: yup.string().nullable(),
  sample_rental_or_purchase: yup.string().nullable(),
  sample_price_per_creator: yup.number().nullable(),
  sample_return_postal_code: yup.string().nullable(),
  sample_return_prefecture: yup.string().nullable(),
  sample_return_city: yup.string().nullable(),
  sample_return_address_line: yup.string().nullable(),
});

export type ContestCreateFormData = yup.InferType<typeof basicInfoSchema> &
  yup.InferType<typeof briefSchema> &
  yup.InferType<typeof resourcesSchema> &
  yup.InferType<typeof prizeSchema> &
  yup.InferType<typeof samplesSchema>;
