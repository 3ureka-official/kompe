import { UserProfile, BankInfo, ProfileFormData, BankFormData, MySubmission, SubmissionStats } from '@/types/profile';
import creatorsData from '@/mock-data/creators.json';
import contestsData from '@/mock-data/contests.json';
import submissionsData from '@/mock-data/submissions.json';
import contestAssetsData from '@/mock-data/contest_assets.json';
import brandsData from '@/mock-data/brands.json';

// JSONデータを型として扱う
const creators = creatorsData.creators;
const contests = contestsData.contests;
const submissions = submissionsData.submissions;
const videoMetricsHistory = submissionsData.video_metrics_history;
const contestAssets = contestAssetsData.contest_assets;
const brands = brandsData.brands;

export class ProfileService {
  // ユーザープロフィールを取得
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const creator = creators.find(c => c.id === userId);
    if (!creator) return null;

    return {
      id: creator.id,
      email: creator.email,
      name: creator.tiktok_username,
      tiktokHandle: `@${creator.tiktok_username}`,
      tiktokId: creator.tiktok_id,
      tiktokUsername: creator.tiktok_username,
      tiktokAvatarUrl: creator.tiktok_avatar_url,
      bankInfo: creator.bank_info ? {
        bankName: creator.bank_info.bank_name,
        branchName: creator.bank_info.branch_name,
        accountType: creator.bank_info.account_type as '普通' | '当座',
        accountNumber: creator.bank_info.account_number,
        accountHolder: creator.bank_info.account_holder,
      } : undefined,
      isMinor: creator.is_minor,
      parentConsentFileUrl: creator.parent_consent_file_url || undefined,
      createdAt: creator.created_at,
      updatedAt: creator.updated_at,
    };
  }

  // プロフィールを更新
  static async updateProfile(userId: string, data: ProfileFormData): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const creator = creators.find(c => c.id === userId);
    if (!creator) {
      throw new Error('ユーザーが見つかりません');
    }

    // 更新されたプロフィールを返す
    return {
      id: creator.id,
      email: data.email,
      name: data.name,
      tiktokHandle: data.tiktokHandle,
      tiktokId: creator.tiktok_id,
      tiktokUsername: creator.tiktok_username,
      tiktokAvatarUrl: creator.tiktok_avatar_url,
      bankInfo: creator.bank_info ? {
        bankName: creator.bank_info.bank_name,
        branchName: creator.bank_info.branch_name,
        accountType: creator.bank_info.account_type as '普通' | '当座',
        accountNumber: creator.bank_info.account_number,
        accountHolder: creator.bank_info.account_holder,
      } : undefined,
      isMinor: creator.is_minor,
      parentConsentFileUrl: creator.parent_consent_file_url || undefined,
      createdAt: creator.created_at,
      updatedAt: new Date().toISOString(),
    };
  }

  // 銀行口座情報を更新
  static async updateBankInfo(userId: string, bankData: BankFormData): Promise<BankInfo> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const creator = creators.find(c => c.id === userId);
    if (!creator) {
      throw new Error('ユーザーが見つかりません');
    }

    return {
      bankName: bankData.bankName,
      branchName: bankData.branchName,
      accountType: bankData.accountType,
      accountNumber: bankData.accountNumber,
      accountHolder: bankData.accountHolder,
    };
  }

  // ユーザーの応募履歴を取得
  static async getUserSubmissions(userId: string, page: number = 1, limit: number = 10): Promise<{
    submissions: MySubmission[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));

    // ユーザーの応募を取得
    const userSubmissions = submissions.filter(s => s.creator_id === userId);

    // 応募に関連するコンテスト情報を結合
    const submissionsWithDetails = userSubmissions.map(submission => {
      const contest = contests.find(c => c.id === submission.contest_id);
      const brand = contest ? brands.find(b => b.id === contest.brand_id) : null;
      const thumbnailAsset = contestAssets.find(a => 
        a.contest_id === submission.contest_id && a.asset_type === 'thumbnail'
      );
      const metrics = videoMetricsHistory.find(m => m.submission_id === submission.id);

      return {
        id: submission.id,
        contestId: submission.contest_id,
        contestTitle: contest?.title || 'Unknown Contest',
        contestThumbnailUrl: thumbnailAsset?.file_url || '',
        brandName: brand?.company_name || 'Unknown Brand',
        tiktokVideoUrl: submission.tiktok_video_url,
        submissionStatus: submission.submission_status as 'pending' | 'approved' | 'rejected' | 'disqualified',
        finalRank: submission.final_rank || undefined,
        finalScore: submission.final_score || undefined,
        prizeAmount: submission.prize_amount || undefined,
        submittedAt: submission.submitted_at,
        approvedAt: submission.approved_at || undefined,
        createdAt: submission.created_at,
        updatedAt: submission.updated_at,
        metrics: metrics ? {
          viewCount: metrics.view_count,
          likeCount: metrics.like_count,
          commentCount: metrics.comment_count,
          shareCount: metrics.share_count,
          engagementRate: metrics.view_count > 0 ? 
            ((metrics.like_count + metrics.comment_count + metrics.share_count) / metrics.view_count) * 100 : 0,
        } : undefined,
      };
    });

    // 提出日時でソート（新しい順）
    submissionsWithDetails.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    // ページネーション
    const total = submissionsWithDetails.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSubmissions = submissionsWithDetails.slice(startIndex, endIndex);

    return {
      submissions: paginatedSubmissions,
      total,
      page,
      limit,
      hasMore: endIndex < total,
    };
  }

  // 応募統計を取得
  static async getSubmissionStats(userId: string): Promise<SubmissionStats> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const userSubmissions = submissions.filter(s => s.creator_id === userId);

    const stats = {
      total: userSubmissions.length,
      pending: userSubmissions.filter(s => s.submission_status === 'pending').length,
      approved: userSubmissions.filter(s => s.submission_status === 'approved').length,
      rejected: userSubmissions.filter(s => s.submission_status === 'rejected').length,
      winner: userSubmissions.filter(s => s.final_rank && s.final_rank <= 3).length,
      totalPrizeAmount: userSubmissions.reduce((sum, s) => sum + (s.prize_amount || 0), 0),
    };

    return stats;
  }

  // 応募詳細を取得
  static async getSubmissionDetail(submissionId: string): Promise<MySubmission | null> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return null;

    const contest = contests.find(c => c.id === submission.contest_id);
    const brand = contest ? brands.find(b => b.id === contest.brand_id) : null;
    const thumbnailAsset = contestAssets.find(a => 
      a.contest_id === submission.contest_id && a.asset_type === 'thumbnail'
    );
    const metrics = videoMetricsHistory.find(m => m.submission_id === submission.id);

    return {
      id: submission.id,
      contestId: submission.contest_id,
      contestTitle: contest?.title || 'Unknown Contest',
      contestThumbnailUrl: thumbnailAsset?.file_url || '',
      brandName: brand?.company_name || 'Unknown Brand',
      tiktokVideoUrl: submission.tiktok_video_url,
      submissionStatus: submission.submission_status as 'pending' | 'approved' | 'rejected' | 'disqualified',
      finalRank: submission.final_rank || undefined,
      finalScore: submission.final_score || undefined,
      prizeAmount: submission.prize_amount || undefined,
      submittedAt: submission.submitted_at,
      approvedAt: submission.approved_at || undefined,
      createdAt: submission.created_at,
      updatedAt: submission.updated_at,
      metrics: metrics ? {
        viewCount: metrics.view_count,
        likeCount: metrics.like_count,
        commentCount: metrics.comment_count,
        shareCount: metrics.share_count,
        engagementRate: metrics.view_count > 0 ? 
          ((metrics.like_count + metrics.comment_count + metrics.share_count) / metrics.view_count) * 100 : 0,
      } : undefined,
    };
  }
} 