import z from "zod";

export const TransferSchema = z.object({
  contestId: z.string(),
  applicationId: z.string(),
});
