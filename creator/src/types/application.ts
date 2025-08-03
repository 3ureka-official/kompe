export interface ApplicationData {
  id: string;
  contestId: string;
  userId: string;
  tiktokUrl: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
}

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "winner";

export interface ApplicationFormData {
  tiktokUrl: string;
  agreedToTerms: boolean;
  agreedToGuidelines: boolean;
}

export interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const APPLICATION_STEPS: ApplicationStep[] = [
  {
    id: 1,
    title: "TikTok動画URL入力",
    description: "コンテストに応募するTikTok動画のURLを入力してください",
    isCompleted: false,
    isActive: true,
  },
  {
    id: 2,
    title: "応募内容確認",
    description: "応募内容を確認し、利用規約に同意してください",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 3,
    title: "応募完了",
    description: "応募が完了しました",
    isCompleted: false,
    isActive: false,
  },
];

export const APPLICATION_STATUS = {
  draft: {
    label: "下書き",
    color: "bg-gray-100 text-gray-800",
    description: "応募準備中",
  },
  submitted: {
    label: "応募済み",
    color: "bg-blue-100 text-blue-800",
    description: "応募完了、審査待ち",
  },
  under_review: {
    label: "審査中",
    color: "bg-yellow-100 text-yellow-800",
    description: "審査中です",
  },
  approved: {
    label: "承認済み",
    color: "bg-green-100 text-green-800",
    description: "応募が承認されました",
  },
  rejected: {
    label: "不承認",
    color: "bg-red-100 text-red-800",
    description: "応募が不承認となりました",
  },
  winner: {
    label: "受賞",
    color: "bg-purple-100 text-purple-800",
    description: "受賞おめでとうございます！",
  },
} as const;
