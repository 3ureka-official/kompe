import SignInButton from "@/components/signInButton";
import Image from "next/image";

export default function Login() {
  const isDev = process.env.NODE_ENV === "development";

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
          <div className="flex items-center gap-4">
            <SignInButton />
          </div>
        )}
      </main>
    </div>
  );
}
