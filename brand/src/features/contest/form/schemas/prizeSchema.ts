import * as yup from "yup";

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

export type PrizeFormData = yup.InferType<typeof prizeSchema>;
