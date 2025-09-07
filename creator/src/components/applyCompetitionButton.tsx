import { Button } from "./ui/button";
import { applyCompetition } from "@/actions/applyCompetition";

type Props = {
  contestId: string;
  children?: React.ReactNode;
  className?: string;
};

export default function ApplyCompetitionButton({
  children,
  contestId,
  className,
}: Props) {
  const applyCompetitionWithId = applyCompetition.bind(null, contestId);
  return (
    <form action={applyCompetitionWithId} className={className}>
      <Button>{children}</Button>
    </form>
  );
}
