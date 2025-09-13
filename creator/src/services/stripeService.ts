import { contest_transfers } from "@prisma/client";

export const createContestTransfer = async (
  contestId: string,
  applicationId: string,
  creatorId: string,
) => {
  const res = await fetch(`/api/stripe/transfers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contestId: contestId,
      applicationId: applicationId,
      creatorId: creatorId,
    }),
  });

  if (!res.ok) throw new Error("Failed to create contest transfer");
  return res.json() as Promise<{ ok: boolean; transfer: contest_transfers }>;
};
