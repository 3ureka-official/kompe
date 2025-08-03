import * as yup from "yup";

// ステップごとのスキーマ
export const basicInfoSchema = yup.object().shape({
  title: yup.string().required("タイトルを入力してください"),
  category: yup.string().required("カテゴリを選択してください"),

  thumbnailFile: yup
    .mixed<File>()
    .required("サムネイル画像を選択してください")
    .test("fileSize", "5 MB 以内にしてください", (file) =>
      file ? file.size <= 5 * 1024 * 1024 : false,
    )
    .test("fileType", "画像ファイルを選択してください", (file) =>
      file ? file.type.startsWith("image/") : false,
    ),

  applicationStartDate: yup.date().required("応募開始日を選択してください"),
  applicationEndDate: yup
    .date()
    .required("応募終了日を選択してください")
    .min(
      yup.ref("applicationStartDate"),
      "応募終了日は開始日より後にしてください",
    ),

  contestStartDate: yup.date().required("開催開始日を選択してください"),
  contestEndDate: yup
    .date()
    .required("開催終了日を選択してください")
    .min(yup.ref("contestStartDate"), "開催終了日は開始日より後にしてください"),
});

export const briefSchema = yup.object().shape({
  description: yup.string().required("説明を入力してください"),
  requirements: yup.string().required("要件を入力してください"),
});

const assetItemSchema = yup.object({
  description: yup.string().nullable(),

  url: yup.string().url("URL 形式で入力してください").nullable(),

  filePreview: yup.string().nullable(),

  file: yup
    .mixed<File>()
    .nullable()
    .test("is-file", "無効なファイルです", (v) =>
      v == null ? true : v instanceof File,
    ),
});

const videoItemSchema = yup.object({
  url: yup.string().url("URL 形式で入力してください").nullable(),
  description: yup.string().nullable(),
});

export const resourcesSchema = yup.object({
  assets: yup.array().of(assetItemSchema).min(0),
  inspirations: yup.array().of(videoItemSchema).min(0),
});

export const prizeSchema = yup.object().shape({
  prizePool: yup
    .number()
    .min(1000, "賞金額を選択してください")
    .required("賞金額を選択してください"),

  prizeDistribution: yup
    .array()
    .min(1, "報酬配分を設定してください")
    .test(
      "total-matches-pool",
      "配分金額の合計が総賞金額と一致しません",
      function (value) {
        const { prizePool } = this.parent;
        if (!value || !prizePool) return true;
        const total = value.reduce((sum, amount) => sum + amount, 0);
        return total === prizePool;
      },
    ),
});

export type ContestCreateFormData = yup.InferType<typeof basicInfoSchema> &
  yup.InferType<typeof briefSchema> &
  yup.InferType<typeof resourcesSchema> &
  yup.InferType<typeof prizeSchema>;
