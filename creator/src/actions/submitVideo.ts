"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function submitVideo(competitionId: string, tikTokUrl: string) {
  const session = await auth();
  if (session?.user?.creator_id) {
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
