import { Contest } from "@/types/Contest";

export function getContestStatus(contest: Contest) {
  const now = new Date();
  const contestStartDate = new Date(contest.contest_start_date);
  const contestEndDate = new Date(contest.contest_end_date);

  if (contest.is_draft) {
    return 0;
  }

  if (now >= contestStartDate && now <= contestEndDate) {
    return 1;
  }

  if (now > contestEndDate) {
    return 2;
  }

  return 0;
}
