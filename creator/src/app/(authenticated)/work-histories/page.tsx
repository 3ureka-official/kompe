import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import AppliedContestTabs from "@/components/appliedContestTabs";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import Loading from "@/components/loading";
import { Session } from "next-auth";

export default async function WorkHistoriesPage() {
  const session = await auth();
  if (!session) {
    return (
      <p className="text-sm text-muted-foreground">ログインしてください</p>
    );
  }

  return (
    <SessionProvider>
      <Suspense fallback={<Loading />}>
        <WorkHistoriesPageContent session={session} />
      </Suspense>
    </SessionProvider>
  );
}

export async function WorkHistoriesPageContent({
  session,
}: {
  session: Session;
}) {
  const applications = await prisma.applications.findMany({
    where: {
      creator_id: session.user.creator_id,
      tiktok_url: {
        not: null,
      },
    },
    include: {
      contests: {
        include: {
          brands: true,
          applications: {
            where: {
              tiktok_url: {
                not: null,
              },
            },
            orderBy: {
              views: "desc",
            },
          },
        },
      },
      contest_transfers: true,
    },
    orderBy: {
      contests: {
        contest_end_date: "desc",
      },
    },
  });

  return <AppliedContestTabs applications={applications} />;
}
