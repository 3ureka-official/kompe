"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrUpdateAddress(data: {
  postal_code: string;
  prefecture: string;
  city: string;
  address_line: string;
}) {
  const session = await auth();
  if (!session?.user?.creator_id) {
    throw new Error("ログインが必要です");
  }

  // バリデーション
  if (
    !data.postal_code ||
    !data.prefecture ||
    !data.city ||
    !data.address_line
  ) {
    throw new Error("すべての項目を入力してください");
  }

  // 郵便番号の形式チェック（ハイフンあり/なし両方対応）
  const postalCodeRegex = /^\d{3}-?\d{4}$/;
  if (!postalCodeRegex.test(data.postal_code.replace(/-/g, ""))) {
    throw new Error("郵便番号の形式が正しくありません");
  }

  // 郵便番号をハイフン付きに統一
  const formattedPostalCode = data.postal_code
    .replace(/-/g, "")
    .replace(/(\d{3})(\d{4})/, "$1-$2");

  // 既存の住所を確認
  const existingAddress = await prisma.creator_addresses.findUnique({
    where: { creator_id: session.user.creator_id },
  });

  if (existingAddress) {
    // 更新
    await prisma.creator_addresses.update({
      where: { creator_id: session.user.creator_id },
      data: {
        postal_code: formattedPostalCode,
        prefecture: data.prefecture,
        city: data.city,
        address_line: data.address_line,
      },
    });
  } else {
    // 作成
    await prisma.creator_addresses.create({
      data: {
        creator_id: session.user.creator_id,
        postal_code: formattedPostalCode,
        prefecture: data.prefecture,
        city: data.city,
        address_line: data.address_line,
      },
    });
  }

  revalidatePath("/mypage");
  revalidatePath("/address/confirm");
}

export async function getAddress() {
  const session = await auth();
  if (!session?.user?.creator_id) {
    return null;
  }

  const address = await prisma.creator_addresses.findUnique({
    where: { creator_id: session.user.creator_id },
  });

  return address;
}

export async function checkAddressAndRedirect(competitionId: string) {
  "use server";
  const { redirect } = await import("next/navigation");

  const address = await getAddress();
  if (!address) {
    redirect(`/address/register?competitionId=${competitionId}`);
  } else {
    redirect(`/address/confirm?competitionId=${competitionId}`);
  }
}
