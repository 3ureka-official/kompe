"use client";

import { useRouter } from "next/navigation";
import { createOrUpdateAddress } from "@/actions/address";
import AddressForm from "./addressForm";

type AddressEditFormProps = {
  initialData: {
    postal_code: string;
    prefecture: string;
    city: string;
    address_line: string;
  };
  competitionId?: string | null;
};

export default function AddressEditForm({
  initialData,
  competitionId,
}: AddressEditFormProps) {
  const router = useRouter();

  const handleSubmit = async (data: {
    postal_code: string;
    prefecture: string;
    city: string;
    address_line: string;
  }) => {
    await createOrUpdateAddress(data);
    if (competitionId) {
      router.push(`/address/confirm?competitionId=${competitionId}`);
    } else {
      router.push("/mypage");
    }
  };

  return (
    <AddressForm
      initialData={initialData}
      onSubmit={handleSubmit}
      submitLabel="変更を保存"
    />
  );
}
