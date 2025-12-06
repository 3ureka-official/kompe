import * as yup from "yup";
import { assetItemSchema } from "./assetItemSchema";
import { inspirationItemSchema } from "./inspirationItemSchema";

export const resourcesSchema = yup.object().shape({
  assets: yup.array().of(assetItemSchema).default([]).min(0),
  inspirations: yup.array().of(inspirationItemSchema).default([]).min(0),
});

export type ResourcesFormData = yup.InferType<typeof resourcesSchema>;
