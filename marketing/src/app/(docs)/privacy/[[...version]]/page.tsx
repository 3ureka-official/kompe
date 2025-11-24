import { loadDoc } from "@/docs";
import { notFound } from "next/navigation";
import { MarkdownBox } from "@/components/markdown/MarkdownBox";

type Props = { params: Promise<{ version?: string[] }> };

export default async function PrivacyPage({ params }: Props) {
  const { version } = await params;
  // versionが配列の場合は最初の要素、なければundefined（最新版を表示）
  const versionParam =
    Array.isArray(version) && version.length > 0 ? version[0] : undefined;

  let md: string;
  try {
    md = loadDoc("privacy", versionParam);
  } catch {
    notFound();
  }

  return (
    <div className="mt-16 min-h-screen text-text bg-background font-sans overflow-x-hidden">
      <div className="prose mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-10 bg-gray-100">
        <MarkdownBox>{md}</MarkdownBox>
      </div>
    </div>
  );
}
