import { CheckIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import GetPrizeDialog from "./getPrizeDialog";
import SignInButton from "@/components/signInButton";
import ApplyDialog from "./applyDialog";
import {
  applications,
  contest_transfers,
  contests,
  creators,
  contest_prizes,
} from "@prisma/client";
import { auth } from "@/auth";
import { getContestDetailStatusType } from "@/utils/getContestStatus";

type ButtomActionBarType = {
  competition: contests & { contest_prizes?: contest_prizes[] };
  applications:
    | (applications & { creators: creators } & {
        contest_transfers: contest_transfers | null;
      })[]
    | null;
  isEnded: boolean;
};

const getIsApplied = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return null;
  return applications.find(
    (app) =>
      app.creator_id === session.user?.creator_id && app.tiktok_url !== null,
  );
};

const getIsConcent = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return null;
  return applications.find(
    (app) => app.creator_id === session.user?.creator_id,
  );
};

const getRanking = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return -1;
  return applications.findIndex(
    (app) =>
      app.creator_id === session.user?.creator_id && app.tiktok_url !== null,
  );
};

export default async function ButtomActionBar({
  competition,
  applications,
  isEnded,
}: ButtomActionBarType) {
  const session = await auth();

  const isApplied = await getIsApplied(applications || []);
  const isConcent = await getIsConcent(applications || []);
  const ranking = await getRanking(applications || []);
  const detailStatus = getContestDetailStatusType(competition);

  return (
    <div className="fixed z-50 bottom-[66px] left-0 right-0 bg-card border border-b-0 rounded-t-2xl w-full p-4">
      {session ? (
        isEnded ? (
          applications && ranking >= 0 ? (
            applications?.[ranking]?.contest_transfers?.stripe_transfer_id ? (
              <p className="text-sm">
                このコンテストは終了しました。
                <br />
                順位：{ranking + 1}位
              </p>
            ) : (
              <GetPrizeDialog
                competition={competition}
                application={applications[ranking]}
                ranking={ranking}
              />
            )
          ) : (
            <p className="text-sm">このコンテストは終了しました。</p>
          )
        ) : detailStatus === "entry" ? (
          // 応募期間: 参加申請のみ可能
          isConcent ? (
            <p className="text-sm">
              応募済みです。動画制作期間までお待ちください。
            </p>
          ) : (
            <ApplyDialog
              competitionId={competition.id}
              hasSample={competition.has_sample || false}
            />
          )
        ) : detailStatus === "video_production" ? (
          // 動画制作期間: 何も表示しない、またはメッセージ
          isConcent ? (
            <p className="text-sm">
              動画制作期間中です。開催期間になると動画を結びつけることができます。
            </p>
          ) : (
            <p className="text-sm">動画制作期間中です。</p>
          )
        ) : detailStatus === "contest" ? (
          // 開催期間: 動画結びつけ可能（応募済みの人のみ）
          isApplied ? (
            <Button className="w-full py-5 font-bold" asChild>
              <Link href={`/applications/${competition.id}`}>
                <Badge variant={"secondary"} className="font-bold">
                  <CheckIcon />
                  応募済み
                </Badge>
                参加動画の確認
              </Link>
            </Button>
          ) : isConcent ? (
            <Button className="w-full py-5 font-bold" asChild>
              <Link href={`/applications/${competition.id}`}>
                <ArrowRightIcon />
                動画を結びつけて参加する
              </Link>
            </Button>
          ) : (
            <p className="text-sm">
              応募期間中に応募していないため、動画を結びつけることができません。
            </p>
          )
        ) : isApplied ? (
          // 開催前またはその他の状態（応募済みの場合のみ確認ボタンを表示）
          <Button className="w-full py-5 font-bold" asChild>
            <Link href={`/applications/${competition.id}`}>
              <Badge variant={"secondary"} className="font-bold">
                <CheckIcon />
                応募済み
              </Badge>
              参加動画の確認
            </Link>
          </Button>
        ) : detailStatus === "scheduled" ? (
          // 開催前: 応募期間までお待ちください
          <p className="text-sm">応募期間開始までお待ちください。</p>
        ) : (
          // その他の状態: 応募期間外のため応募できません
          <p className="text-sm">応募期間外のため、応募できません。</p>
        )
      ) : process.env.NEXT_PUBLIC_APP_ENV === "development" ? (
        <p className="text-sm">コンテスト開始までお待ちください</p>
      ) : (
        <SignInButton
          className="*:w-full *:py-5"
          redirectTo={`/competitions/${competition.id}`}
        />
      )}
    </div>
  );
}
