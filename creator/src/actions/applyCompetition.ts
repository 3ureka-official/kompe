"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function applyCompetition(
  competitionId: string,
  formData: FormData,
) {
  const session = await auth();
  if (session?.user?.id) {
    console.log("Creating application...", competitionId, session.user.id);
    let creator = await prisma.creators.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!creator) {
      creator = await prisma.creators.create({
        data: {
          tiktok_union_id: session.user.id,
          display_name: session.user.name || "No Name",
          username: session.user.email || "no.username",
          avatar_url: session.user.image || "",
        },
      });
    }
    await prisma.applications.create({
      data: {
        creator_id: creator.id,
        contest_id: competitionId,
      },
    });
    redirect(`/applications/${competitionId}`);
  } else {
    await signIn("tiktok");
  }
}
