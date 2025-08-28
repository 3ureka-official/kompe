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
  redirectTo = "/dashboard",
}: Props) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("tiktok", { redirectTo });
      }}
      className={className}
    >
      <Button className="bg-black">
        <Image
          className="dark:invert"
          src="/external/TikTok_Icon_Black_Square.png"
          alt="TikTok logomark"
          width={28}
          height={28}
        />
        {buttonTexts[variant]}
      </Button>
    </form>
  );
}
