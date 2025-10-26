import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import AppliedContestTabs from "@/components/appliedContestTabs";

export default async function Competitions() {
  const session = await auth();
  if (!session) {
    return <p>ログインしてください</p>;
  }

  const applications = await prisma.applications.findMany({
    where: { creator_id: session.user.creator_id },
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
