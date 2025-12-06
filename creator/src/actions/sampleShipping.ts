"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function notifySampleReceived(applicationId: string) {
  const session = await auth();
  if (!session?.user?.creator_id) {
    throw new Error("ログインが必要です");
  }

  // 応募情報を確認
  const application = await prisma.applications.findUnique({
    where: { id: applicationId },
    include: {
      contests: true,
    },
  });

  if (!application) {
    throw new Error("応募情報が見つかりませんでした");
  }

  if (application.creator_id !== session.user.creator_id) {
    throw new Error("権限がありません");
  }

  // 発送通知を取得
  const shippingNotification =
    await prisma.shipping_sample_notifications.findFirst({
      where: {
        application_id: applicationId,
      },
    });

  if (!shippingNotification) {
    throw new Error("発送通知が見つかりませんでした");
  }

  // ステータスをdeliveredに更新
  await prisma.shipping_sample_notifications.update({
    where: { id: shippingNotification.id },
    data: {
      status: "delivered",
    },
  });

  revalidatePath(`/competitions/${application.contest_id}`);
}
