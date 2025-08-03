// プロフィール関連の型定義

export interface BankInfo {
  bankName: string;
  branchName: string;
  accountType: "普通" | "当座";
  accountNumber: string;
  accountHolder: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  tiktokHandle?: string;
  tiktokId?: string;
  tiktokUsername?: string;
  tiktokAvatarUrl?: string;
  bankInfo?: BankInfo;
  isMinor: boolean;
  parentConsentFileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  tiktokHandle?: string;
}

export interface BankFormData {
  bankName: string;
  branchName: string;
  accountType: "普通" | "当座";
  accountNumber: string;
  accountHolder: string;
}

export interface MySubmission {
  id: string;
  contestId: string;
  contestTitle: string;
  contestThumbnailUrl: string;
  brandName: string;
  tiktokVideoUrl: string;
  submissionStatus: "pending" | "approved" | "rejected" | "disqualified";
  finalRank?: number;
  finalScore?: number;
  prizeAmount?: number;
  submittedAt: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  // メトリクス情報
  metrics?: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
    engagementRate: number;
  };
}

export interface SubmissionStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  winner: number;
  totalPrizeAmount: number;
}
