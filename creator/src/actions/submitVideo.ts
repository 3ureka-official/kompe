"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getContestDetailStatusType } from "@/utils/getContestStatus";
import { tikTokAPIClient } from "@/lib/api/tiktok";

export async function submitVideo(competitionId: string, tikTokUrl: string) {
  const session = await auth();
  if (session?.user?.creator_id) {
    // コンテスト情報を取得
    const contest = await prisma.contests.findUnique({
      where: { id: competitionId },
    });

    if (!contest) {
      throw new Error("コンテストが見つかりませんでした");
    }

    // 開催期間中のみ動画結びつけ可能
    const detailStatus = getContestDetailStatusType(contest);
    if (detailStatus !== "contest") {
      throw new Error("開催期間中のみ動画を結びつけることができます");
    }

    // 応募情報を取得
    const application = await prisma.applications.findFirst({
      where: {
        creator_id: session.user.creator_id,
        contest_id: competitionId,
      },
    });

    if (!application) {
      throw new Error("応募情報が見つかりませんでした");
    }

    // クリエイター情報を取得
    const creator = await prisma.creators.findUnique({
      where: { id: session.user.creator_id },
    });

    if (!creator) {
      throw new Error("クリエイター情報が見つかりませんでした");
    }

    // 動画の投稿日時を確認（動画制作期間または開催期間内であることを確認）
    const tikTokAPIClientInstance = tikTokAPIClient(creator);
    const videoData = await tikTokAPIClientInstance.queryVideos(
      [tikTokUrl],
      ["id", "create_time"],
    );

    if (videoData.data.videos.length === 0) {
      throw new Error("動画が見つかりませんでした");
    }

    const video = videoData.data.videos[0];
    if (!video.create_time) {
      throw new Error("動画の投稿日時を取得できませんでした");
    }

    const videoDate = new Date(video.create_time * 1000);
    let isWithinPeriod = false;

    // 動画制作期間内かチェック
    if (
      contest.video_production_start_date &&
      contest.video_production_end_date
    ) {
      const productionStart = new Date(contest.video_production_start_date);
      const productionEnd = new Date(contest.video_production_end_date);
      if (videoDate >= productionStart && videoDate <= productionEnd) {
        isWithinPeriod = true;
      }
    }

    // 開催期間内かチェック
    if (
      !isWithinPeriod &&
      contest.contest_start_date &&
      contest.contest_end_date
    ) {
      const contestStart = new Date(contest.contest_start_date);
      const contestEnd = new Date(contest.contest_end_date);
      if (videoDate >= contestStart && videoDate <= contestEnd) {
        isWithinPeriod = true;
      }
    }

    if (!isWithinPeriod) {
      throw new Error(
        "動画制作期間または開催期間中に投稿した動画のみ結びつけることができます",
      );
    }

    await prisma.applications.updateMany({
      where: {
        creator_id: session.user.creator_id,
        contest_id: competitionId,
      },
      data: {
        tiktok_url: tikTokUrl,
      },
    });
    redirect(`/applications/${competitionId}`);
  } else {
    await signIn("tiktok");
  }
}
