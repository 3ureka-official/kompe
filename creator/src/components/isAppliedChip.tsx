import { CheckIcon, VideoIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { auth } from "@/auth";
import { applications } from "@prisma/client";

const getIsConcent = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return null;
  return applications.find(
    (app) => app.creator_id === session.user?.creator_id,
  );
};

const getIsApplied = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return null;
  return applications.find(
    (app) =>
      app.creator_id === session.user?.creator_id && app.tiktok_url !== null,
  );
};

export default async function IsAppliedChip({
  title,
  applications,
}: {
  title: string;
  applications: applications[];
}) {
  const isConcent = await getIsConcent(applications || []);
  const isApplied = await getIsApplied(applications || []);

  return (
    <h1 className="flex items-center gap-4 text-2xl font-bold">
      {title}
      {isApplied ? (
        <Badge variant={"default"} className="font-bold py-1">
          <VideoIcon className="size-3" />
          動画提出済み
        </Badge>
      ) : isConcent ? (
        <Badge variant={"secondary"} className="font-bold py-1">
          <CheckIcon className="size-3" />
          応募済み
        </Badge>
      ) : null}
    </h1>
  );
}
