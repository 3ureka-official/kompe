import { supabase } from "@/lib/supabase";

export async function createCheckoutSession(
  contestId: string,
  amountJpy: number,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Unauthorized");

  const token = session.access_token;
  if (!token) throw new Error("No access token");

  const res = await fetch(
    `/api/contests/${contestId}/deposit/checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amountJpy: amountJpy }),
    },
  );

  if (!res.ok) throw new Error("Failed to create checkout session");
  return res.json() as Promise<{ url: string }>;
}
