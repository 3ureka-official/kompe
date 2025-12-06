import * as yup from "yup";
import { basicInfoSchema } from "./basicInfoSchema";
import { briefSchema } from "./briefSchema";
import { resourcesSchema } from "./resourcesSchema";
import { prizeSchema } from "./prizeSchema";
import { samplesSchema } from "./samplesSchema";

// すべてのスキーマを再エクスポート
export { basicInfoSchema } from "./basicInfoSchema";
export { briefSchema } from "./briefSchema";
export { assetItemSchema } from "./assetItemSchema";
export { inspirationItemSchema } from "./inspirationItemSchema";
export { resourcesSchema } from "./resourcesSchema";
export { prizeSchema } from "./prizeSchema";
export { samplesSchema } from "./samplesSchema";

export type ContestCreateFormData = yup.InferType<typeof basicInfoSchema> &
  yup.InferType<typeof briefSchema> &
  yup.InferType<typeof resourcesSchema> &
  yup.InferType<typeof prizeSchema> &
  yup.InferType<typeof samplesSchema>;
