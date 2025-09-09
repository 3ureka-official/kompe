"use client";

import { Button } from "@/components/ui/button";

export default function ConnectStripeButton() {
  const connectToStripe = async () => {
    try {
      const res = await fetch("/api/stripe/connect/account/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      window.location.assign(data.url);
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onClick={connectToStripe}>入金口座を登録</Button>;
}
