import { CheckIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { auth } from "@/auth";
import { applications } from "@prisma/client";

const getIsApplied = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return null;
  return applications.find(
    (app) => app.creator_id === session.user?.creator_id,
  );
};

export default async function IsAppliedChip({
  title,
  applications,
}: {
  title: string;
  applications: applications[];
}) {
  const isApplied = await getIsApplied(applications || []);

  return (
    <h1 className="flex items-center gap-2 text-2xl font-bold">
      {title}
      {isApplied && (
        <Badge>
          <CheckIcon />
          応募済み
        </Badge>
      )}
    </h1>
  );
}
