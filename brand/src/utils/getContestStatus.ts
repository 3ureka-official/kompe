import { Contest } from "@/types/Contest";

export function getContestStatus(contest: Contest) {
  const now = new Date();
  const applicationStartDate = new Date(contest.application_start_date);
  const applicationEndDate = new Date(contest.application_end_date);
  const contestStartDate = new Date(contest.contest_start_date);
  const contestEndDate = new Date(contest.contest_end_date);

  if (contest.is_draft) {
    return 0;
  }

  if (now < applicationStartDate) {
    return 1;
  }

  if (now >= applicationStartDate && now <= applicationEndDate) {
    return 2;
  }

  if (now >= contestStartDate && now <= contestEndDate) {
    return 3;
  }

  if (now > contestEndDate) {
    return 4;
  }

  return 0;
}
