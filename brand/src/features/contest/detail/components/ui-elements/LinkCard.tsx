import { Link } from "lucide-react";

interface LinkCardProps {
  url: string;
  description?: string;
}

export function LinkCard({ url, description }: LinkCardProps) {
  return (
    <div className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50">
      {url && (
        <div className="text-sm rounded flex items-center justify-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="h-30 w-30 flex items-center justify-center bg-gray-100 border border-gray-200"
          >
            <Link className="w-10 h-10 flex-shrink-0" />
          </a>
        </div>
      )}

      {description && (
        <div className="text-sm p-2 rounded min-h-[5rem]">{description}</div>
      )}
    </div>
  );
}
