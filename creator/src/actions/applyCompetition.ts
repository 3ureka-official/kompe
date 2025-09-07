"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function applyCompetition(competitionId: string) {
  const session = await auth();
  if (session?.user?.creator_id) {
    await prisma.applications.create({
      data: {
        creator_id: session.user.creator_id,
        contest_id: competitionId,
      },
    });
    redirect(`/applications/${competitionId}`);
  } else {
    await signIn("tiktok");
  }
}
