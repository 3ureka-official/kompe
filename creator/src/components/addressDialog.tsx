"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddressForm from "./addressForm";
import { createOrUpdateAddress } from "@/actions/address";
import { useRouter } from "next/navigation";

type AddressDialogProps = {
  initialData?: {
    postal_code: string;
    prefecture: string;
    city: string;
    address_line: string;
  } | null;
  triggerLabel: string;
  title: string;
};

export default function AddressDialog({
  initialData,
  triggerLabel,
  title,
}: AddressDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: {
    postal_code: string;
    prefecture: string;
    city: string;
    address_line: string;
  }) => {
    await createOrUpdateAddress(data);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <AddressForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          submitLabel="保存"
          cancelLabel="キャンセル"
        />
      </DialogContent>
    </Dialog>
  );
}
