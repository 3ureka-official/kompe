import * as yup from "yup";
import { SAMPLE_OPTIONS } from "../../common/constants/contest.constant";

export const samplesSchema = yup.object().shape({
  has_sample: yup
    .boolean()
    .required("試供品を提供するかどうかを選択してください")
    .default(false),

  // has_sampleがtrueの場合に必須
  sample_product_name: yup
    .string()
    .when("has_sample", {
      is: true,
      then: (schema) => schema.required("商品名を入力してください"),
      otherwise: (schema) => schema.notRequired(),
    })
    .default(""),
  sample_image_url: yup
    .string()
    .when("has_sample", {
      is: true,
      then: (schema) => schema.required("試供品の画像を選択してください"),
      otherwise: (schema) => schema.notRequired(),
    })
    .default(""),
  sample_provide_type: yup
    .string()
    .oneOf(SAMPLE_OPTIONS.map((option) => option.value))
    .when("has_sample", {
      is: true,
      then: (schema) => schema.required("貸す/提供を選択してください"),
      otherwise: (schema) => schema.notRequired(),
    })
    .default(SAMPLE_OPTIONS[0].value),

  // sample_rental_or_purchaseがRENTALの場合に必須
  sample_return_postal_code: yup
    .string()
    .when("has_sample", {
      is: true,
      then: (schema) =>
        schema.when("sample_provide_type", {
          is: "RENTAL",
          then: (schema) => schema.required("郵便番号を入力してください"),
          otherwise: (schema) => schema.notRequired(),
        }),
      otherwise: (schema) => schema.notRequired(),
    })
    .default(""),
  sample_return_prefecture: yup
    .string()
    .when("has_sample", {
      is: true,
      then: (schema) =>
        schema.when("sample_provide_type", {
          is: "RENTAL",
          then: (schema) => schema.required("都道府県を選択してください"),
          otherwise: (schema) => schema.notRequired(),
        }),
      otherwise: (schema) => schema.notRequired(),
    })
    .when("sample_provide_type", {
      is: "RENTAL",
      then: (schema) => schema.required("都道府県を選択してください"),
      otherwise: (schema) => schema.notRequired(),
    })
    .default(""),
  sample_return_city: yup
    .string()
    .when("has_sample", {
      is: true,
      then: (schema) =>
        schema.when("sample_provide_type", {
          is: "RENTAL",
          then: (schema) => schema.required("市区町村を選択してください"),
          otherwise: (schema) => schema.notRequired(),
        }),
      otherwise: (schema) => schema.notRequired(),
    })
    .default(""),
  sample_return_address_line: yup.string().default(""),
});

export type SamplesFormData = yup.InferType<typeof samplesSchema>;
