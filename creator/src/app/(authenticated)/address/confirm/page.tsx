import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAddress } from "@/actions/address";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { applyCompetition } from "@/actions/applyCompetition";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export default async function AddressConfirmPage({
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

  if (!competitionId) {
    redirect("/");
  }

  const address = await getAddress();

  if (!address) {
    // 住所が登録されていない場合は登録ページへリダイレクト
    redirect(`/address/register?competitionId=${competitionId}`);
  }

  // 既に応募済みかチェック
  const existingApplication = await prisma.applications.findFirst({
    where: {
      creator_id: session.user.creator_id,
      contest_id: competitionId,
    },
  });

  if (existingApplication) {
    // 既に応募済みの場合はコンテストページへリダイレクト
    redirect(`/competitions/${competitionId}`);
  }

  async function handleConfirm() {
    "use server";
    if (!competitionId) {
      throw new Error("コンテストIDが指定されていません");
    }
    await applyCompetition(competitionId);
    revalidatePath(`/competitions/${competitionId}`);
    redirect(`/competitions/${competitionId}`);
  }

  return (
    <div className="flex flex-col min-h-full p-4">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold">住所の確認</h1>
          <p className="text-sm text-muted-foreground mt-2">
            試供品を送付するために、以下の住所で問題ありませんか？
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>登録住所</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">郵便番号</p>
              <p className="text-base font-medium">{address.postal_code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">都道府県</p>
              <p className="text-base font-medium">{address.prefecture}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">市区町村</p>
              <p className="text-base font-medium">{address.city}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">番地・建物名</p>
              <p className="text-base font-medium">{address.address_line}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3">
          <form action={handleConfirm}>
            <Button type="submit" className="w-full py-5 font-bold">
              この住所で問題ありません
            </Button>
          </form>
          <Link href={`/address/edit?competitionId=${competitionId}`}>
            <Button variant="outline" className="w-full py-5">
              住所を変更する
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
