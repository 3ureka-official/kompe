import * as yup from "yup";

export const basicInfoSchema = yup.object().shape({
  title: yup.string().default("").required("タイトルを入力してください"),
  thumbnail_urls: yup
    .array()
    .of(yup.string().required())
    .default([])
    .min(1, "サムネイルを1枚以上選択してください"),

  // 応募期間
  entry_start_date: yup
    .date()
    .default(() => new Date())
    .required("応募開始日を選択してください"),
  entry_end_date: yup
    .date()
    .default(() => new Date())
    .required("応募終了日を選択してください")
    .min(yup.ref("entry_start_date"), "応募終了日は開始日より後にしてください"),

  // 動画制作期間
  video_production_start_date: yup
    .date()
    .default(() => new Date())
    .required("動画制作開始日を選択してください"),
  video_production_end_date: yup
    .date()
    .default(() => new Date())
    .required("動画制作終了日を選択してください")
    .min(
      yup.ref("video_production_start_date"),
      "動画制作終了日は開始日より後にしてください",
    ),

  // 開催期間
  contest_start_date: yup
    .date()
    .default(() => new Date())
    .required("開催開始日を選択してください"),
  contest_end_date: yup
    .date()
    .default(() => new Date())
    .required("開催終了日を選択してください")
    .min(
      yup.ref("contest_start_date"),
      "開催終了日は開始日より後にしてください",
    ),
});

export type BasicInfoFormData = yup.InferType<typeof basicInfoSchema>;
