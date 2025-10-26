import { Button } from "./ui/button";
import { applyCompetition } from "@/actions/applyCompetition";

type Props = {
  contestId: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export default function ApplyCompetitionButton({
  children,
  contestId,
  disabled,
  className,
}: Props) {
  const applyCompetitionWithId = applyCompetition.bind(null, contestId);
  return (
    <form action={applyCompetitionWithId} className={className}>
      <Button disabled={disabled}>{children}</Button>
    </form>
  );
}
