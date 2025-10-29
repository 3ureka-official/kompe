"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loading from "./loading";

export default function ConnectStripeButton() {
  const [open, setOpen] = useState(false);
  const connectToStripe = async () => {
    setOpen(true);
    try {
      const res = await fetch("/api/stripe/connect/account/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={connectToStripe} className="py-5 font-bold">
        入金口座を登録
      </Button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700/50 z-50">
          <Loading message="ページ移動中..." />
        </div>
      )}
    </>
  );
}
