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
} from "@prisma/client";
import { auth } from "@/auth";

type ButtomActionBarType = {
  competition: contests;
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
    (app) => app.creator_id === session.user?.creator_id,
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

  return (
    <div className="fixed bottom-[66px] left-0 right-0 bg-card border border-b-0 rounded-t-2xl w-full p-4">
      {session ? (
        isEnded ? (
          applications && ranking >= 0 ? (
            applications?.[ranking]?.contest_transfers?.stripe_transfer_id ? (
              <p className="text-sm text-muted-foreground">
                このコンテストは終了しました。
                <br />
                順位：{ranking + 1}位
              </p>
            ) : (
              <GetPrizeDialog
                competition={competition}
                application={applications[ranking]}
                contestTransfers={applications[ranking]?.contest_transfers}
                ranking={ranking}
              />
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              このコンテストは終了しました。
            </p>
          )
        ) : isApplied ? (
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
              今すぐ参加
            </Link>
          </Button>
        ) : (
          <ApplyDialog competitionId={competition.id} />
        )
      ) : (
        <SignInButton
          className="*:w-full *:py-5"
          redirectTo={`/competitions/${competition.id}`}
        />
      )}
    </div>
  );
}
