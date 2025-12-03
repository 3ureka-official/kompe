import SignInButton from "@/components/signInButton";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const isDev = process.env.NEXT_PUBLIC_APP_ENV === "development";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            src="/logo-colored.svg"
            alt="Kompe logo"
            width={180}
            height={38}
            priority
          />
        </div>

        {isDev ? (
          <div className="flex items-center gap-4">
            <p>近日、公開予定のページです。</p>
          </div>
        ) : (
          <LoginPageContent />
        )}
      </main>
    </div>
  );
}

async function LoginPageContent() {
  return (
    <>
      <p className="text-xl font-bold text-center">
        Kompeにログインしてコンテストに応募しましょう
      </p>
      <div className="flex items-center gap-4">
        <SignInButton />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm">
          続行すると、利用規約とプライバシーポリシーに同意したことになります。
        </p>
        <Link
          href="https://www.kompe.app/terms"
          target="_blank"
          className="text-sm text-muted-foreground"
        >
          利用規約
        </Link>
        <Link
          href="https://www.kompe.app/privacy"
          target="_blank"
          className="text-sm text-muted-foreground"
        >
          プライバシーポリシー
        </Link>
      </div>
    </>
  );
}
