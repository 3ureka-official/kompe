import { supabase } from "@/lib/supabase";
import { ContestTransfer } from "@/types/ContestTransfer";

export async function findStripeAccountIdByCreator(creatorId: string) {
  const { data, error } = await supabase
    .from("stripe_connect_accounts")
    .select("stripe_account_id")
    .eq("creator_id", creatorId)
    .maybeSingle();

  if (error) throw error;
  return data?.stripe_account_id ?? null;
}

export async function upsertContestTransferUnique(row: {
  contest_id: string;
  application_id: string;
  creator_id: string;
  stripe_transfer_id: string;
  destination_account: string;
  currency: string;
  amount: number;
}) {
  const { error } = await supabase
    .from("contest_transfers")
    .upsert(row, { onConflict: "contest_id,application_id,creator_id" });

  if (error) throw error;
}
