import { signIn } from "@/auth";
import Image from "next/image";

export default async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("tiktok", { redirectTo: "/dashboard" });
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
}
