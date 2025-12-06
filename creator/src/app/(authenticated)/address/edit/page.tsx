import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAddress } from "@/actions/address";
import AddressEditForm from "@/components/addressEditForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AddressEditPage({
  searchParams,
}: {
  searchParams: Promise<{ competitionId?: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const params = await searchParams;
  const competitionId = params.competitionId;
  const address = await getAddress();

  if (!address) {
    // 住所が登録されていない場合は登録ページへリダイレクト
    if (competitionId) {
      redirect(`/address/register?competitionId=${competitionId}`);
    } else {
      redirect("/address/register");
    }
  }

  return (
    <div className="flex flex-col min-h-full p-4">
      <div className="max-w-2xl mx-auto w-full">
        <Card>
          <CardHeader>
            <CardTitle>住所を変更</CardTitle>
          </CardHeader>
          <CardContent>
            <AddressEditForm
              initialData={address}
              competitionId={competitionId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
