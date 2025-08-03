import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Contest } from "@/types/contest";
import { MarkdownBox } from "@/components/ui/markdown/MarkdownBox";

interface ContestGuidelinesProps {
  contest: Contest;
}

export function ContestGuidelines({ contest }: ContestGuidelinesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <CheckCircle className="h-5 w-5 text-green-500" />
          応募条件・ガイドライン
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-green-700">応募条件</h4>
            <MarkdownBox content={contest.requirements} />
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-blue-700">イメージ動画</h4>
            <MarkdownBox content={contest.inspirations} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
