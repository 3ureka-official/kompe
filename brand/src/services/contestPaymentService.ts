import { supabase, supabaseAdmin } from "@/lib/supabase";

export const getContestPayment = async (contestId: string) => {
  const { data, error } = await supabase
    .from("contest_payments")
    .select("*")
    .eq("contest_id", contestId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export async function upsertPendingFromSession(payload: any) {
  const { error } = await supabaseAdmin()
    .from("contest_payments")
    .upsert(payload, { onConflict: "stripe_checkout_session_id" });
  if (error) throw error;
}

export async function upsertSucceededFromPI(payload: any) {
  const { error } = await supabaseAdmin()
    .from("contest_payments")
    .upsert(payload, { onConflict: "stripe_payment_intent_id" });
  if (error) throw error;
}
