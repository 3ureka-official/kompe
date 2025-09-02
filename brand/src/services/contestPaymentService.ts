import { supabase, supabaseAdmin } from "@/lib/supabase";
import { ContestPayment } from "@/types/ContestPayment";

export const getContestPayment = async (
  contestId: string,
): Promise<ContestPayment | null> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), 3000);
  });

  const queryPromise = supabase
    .from("contest_payments")
    .select("*")
    .eq("contest_id", contestId)
    .single();

  try {
    const result = await Promise.race([queryPromise, timeoutPromise]);
    const { data, error } = result;

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "Timeout") {
      console.warn("Contest payment query timeout");
      return null;
    }
    throw error;
  }
};

export async function upsertPendingFromSession(
  payload: Omit<ContestPayment, "id" | "created_at">,
) {
  const { error } = await supabaseAdmin()
    .from("contest_payments")
    .upsert(payload, { onConflict: "stripe_checkout_session_id" });
  if (error) throw error;
}

export async function upsertSucceededFromPI(
  payload: Omit<ContestPayment, "id" | "created_at">,
) {
  const { error } = await supabaseAdmin()
    .from("contest_payments")
    .upsert(payload, { onConflict: "stripe_payment_intent_id" });
  if (error) throw error;
}
