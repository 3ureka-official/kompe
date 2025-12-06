"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createOrUpdateAddress } from "@/actions/address";
import AddressForm from "@/components/addressForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddressRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const competitionId = searchParams.get("competitionId");

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
    <div className="flex flex-col min-h-full p-4">
      <div className="max-w-2xl mx-auto w-full">
        <Card>
          <CardHeader>
            <CardTitle>住所を登録</CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
