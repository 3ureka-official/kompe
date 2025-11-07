import { signIn } from "@/auth";
import Image from "next/image";
import { Button } from "./ui/button";

type Props = {
  variant?: "default" | "minimal";
  className?: string;
  redirectTo?: string;
};

const buttonTexts = {
  default: "TikTokアカウントで始める",
  minimal: "ログイン",
};

export default async function SignInButton({
  variant = "default",
  className,
  redirectTo = "/mypage",
}: Props) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("tiktok", { redirectTo });
      }}
      className={className}
    >
      <Button className="bg-black cursor-pointer py-5">
        <Image
          className="dark:invert"
          src="/images/logo/TikTok_Icon_Black_Square.png"
          alt="TikTok logomark"
          quality={100}
          width={28}
          height={28}
        />
        {buttonTexts[variant]}
      </Button>
    </form>
  );
}
