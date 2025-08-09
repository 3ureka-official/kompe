import { auth, signIn } from "@/auth";
import Image from "next/image";

export default async function SignIn() {
  const session = await auth();
  if (!session)
    return (
      <form
        action={async () => {
          "use server";
          await signIn("tiktok");
        }}
      >
        <button className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:text-gray-200 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
          <Image
            className="dark:invert"
            src="/external/TikTok_Icon_Black_Square.png"
            alt="TikTok logomark"
            width={28}
            height={28}
          />
          TikTokアカウントで始める
        </button>
      </form>
    );
  return (
    <div>
      <ul>
        <li>email {session.user?.email}</li>
        <li>name {session.user?.name}</li>
        <li>image {session.user?.image}</li>
        <li>id {session.user?.id}</li>
        <li>expires {session.expires}</li>
      </ul>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
