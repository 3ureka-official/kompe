"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function submitVideo(
  competitionId: string,
  currentState: string | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (session?.user?.creator_id) {
    const tiktok_url = formData.get("tiktok_url");
    if (!tiktok_url) return "Urlが空です";
    await prisma.applications.updateMany({
      where: {
        creator_id: session.user.creator_id,
        contest_id: competitionId,
      },
      data: {
        tiktok_url: tiktok_url as string,
      },
    });
    redirect(`/applications/${competitionId}`);
  } else {
    await signIn("tiktok");
  }
}
