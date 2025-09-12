import { auth } from "@/auth";
import CheckStripeHistoryButton from "@/components/CheckStripeHistoryButton";
import ConnectStripeButton from "@/components/ConnectStripeButton";
import prisma from "@/lib/prisma";

export default async function Profile() {
  const session = await auth();
  if (!session) {
    return <div>Please sign in to access the profile.</div>;
  }

  const creatorId = session?.user?.creator_id;
  const account = await prisma.stripe_connect_accounts.findUnique({
    where: {
      creator_id: creatorId,
    },
  });

  return (
    <div className="w-full grid gap-8 p-8">
      {account ? <CheckStripeHistoryButton /> : <ConnectStripeButton />}
    </div>
  );
}
