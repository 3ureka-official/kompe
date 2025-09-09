"use client";

import { Button } from "@/components/ui/button";

export default function CheckStripeHistoryButton() {
  const checkStripeHistory = async () => {
    try {
      const res = await fetch("/api/stripe/connect/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      window.location.assign(data.url);
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onClick={checkStripeHistory}>入金履歴を確認</Button>;
}
