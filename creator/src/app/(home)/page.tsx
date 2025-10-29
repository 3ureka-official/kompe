import prisma from "@/lib/prisma";
import { formatDate } from "@/utils/format";
import { Suspense } from "react";
import ContestCard from "@/components/contestCard";
import { SkeletonCardContent } from "@/components/skeletonCardContent";
import ContestFilterSelect from "@/components/contestFilterSelect";
import { auth } from "@/auth";

type HomePageProps = { searchParams?: Promise<{ period?: string }> };

export default async function HomePage({ searchParams }: HomePageProps) {
  const period = (await searchParams)?.period ?? "all";

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-lg font-bold ">コンテスト一覧</h1>
        <ContestFilterSelect />
      </div>
      <Suspense fallback={<SkeletonCardContent />}>
        <ContestsList periodOptions={period} />
      </Suspense>
    </div>
  );
}

const filterPrismaContests = (period: string) => {
  const today = formatDate(new Date());
  const boundary = new Date(`${today}T00:00:00Z`);

  switch (period) {
    case "ongoing":
      return {
        contest_start_date: { lte: boundary },
        contest_end_date: { gte: boundary },
      };

    case "ended":
      return {
        contest_end_date: { lt: boundary },
      };

    case "all":
    default:
      return {};
  }
};

async function ContestsList({ periodOptions }: { periodOptions: string }) {
  const session = await auth();

  const filter = await filterPrismaContests(periodOptions);

  const data = await prisma.contests.findMany({
    include: {
      brands: true,
      contest_transfers: true,
      applications: {
        where: {
          tiktok_url: {
            not: null,
          },
        },
        orderBy: {
          views: "asc",
        },
      },
    },
    orderBy: {
      contest_start_date: "asc",
    },
    where: filter,
  });

  return (
    <div className="grid gap-4 pb-20">
      {data.length > 0 ? (
        data.map((competition) => {
          const my_contest_transfer =
            competition.contest_transfers.find(
              (contest_transfer) =>
                contest_transfer.creator_id === session?.user?.creator_id,
            ) || null;

          const my_application =
            competition.applications.find(
              (application) =>
                application.creator_id === session?.user?.creator_id,
            ) || null;

          return (
            <ContestCard
              key={competition.id}
              contest={competition}
              applications={competition.applications}
              brands={competition.brands}
              contest_transfer={my_contest_transfer}
              my_application={my_application}
            />
          );
        })
      ) : (
        <div className="text-sm text-muted-foreground">
          開催中のコンテストがありません
        </div>
      )}
    </div>
  );
}
