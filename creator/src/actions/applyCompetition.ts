"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getContestDetailStatusType } from "@/utils/getContestStatus";
import { getAddress } from "./address";

export async function applyCompetition(competitionId: string) {
  const session = await auth();
  if (session?.user?.creator_id) {
    // コンテスト情報を取得
    const contest = await prisma.contests.findUnique({
      where: { id: competitionId },
    });

    if (!contest) {
      throw new Error("コンテストが見つかりませんでした");
    }

    // 応募期間中のみ応募可能
    const detailStatus = getContestDetailStatusType(contest);
    if (detailStatus !== "entry") {
      throw new Error("応募期間中のみ応募できます");
    }

    // 既に応募済みかチェック
    const existingApplication = await prisma.applications.findFirst({
      where: {
        creator_id: session.user.creator_id,
        contest_id: competitionId,
      },
    });

    if (existingApplication) {
      throw new Error("既に応募済みです");
    }

    // 試供品ありのコンテストの場合、住所が登録されているかチェック
    if (contest.has_sample) {
      const address = await getAddress();
      if (!address) {
        throw new Error("試供品を送付するために住所の登録が必要です");
      }
    }

    await prisma.applications.create({
      data: {
        creator_id: session.user.creator_id,
        contest_id: competitionId,
      },
    });
    revalidatePath(`/competitions/${competitionId}`);
  } else {
    await signIn("tiktok");
  }
}
