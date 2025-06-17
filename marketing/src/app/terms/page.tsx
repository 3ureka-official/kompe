import { loadDoc } from "@/docs";
import { notFound } from "next/navigation";
import { MarkdownBox } from "@/components/markdown/MarkdownBox";

type Props = { params: Promise<{ version: string }> };

export default async function TermsPage({ params }: Props) {
  const version = (await params).version;
  
  let md: string;
  try {
    md = loadDoc("terms", version);
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