import { ApplicationData, ApplicationFormData } from '@/types/application';

const STORAGE_KEY = 'contest_applications';

export class ApplicationService {
  // LocalStorageから応募データを取得
  private static getApplicationsFromStorage(): ApplicationData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get applications from storage:', error);
      return [];
    }
  }

  // LocalStorageに応募データを保存
  private static saveApplicationsToStorage(applications: ApplicationData[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (error) {
      console.error('Failed to save applications to storage:', error);
    }
  }

  // 新しい応募を作成
  static async createApplication(
    contestId: string,
    userId: string,
    formData: ApplicationFormData
  ): Promise<ApplicationData> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const applications = this.getApplicationsFromStorage();

    // 既に同じコンテストに応募済みかチェック
    const existingApplication = applications.find(
      app => app.contestId === contestId && app.userId === userId
    );

    if (existingApplication) {
      throw new Error('このコンテストには既に応募済みです');
    }

    const newApplication: ApplicationData = {
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      contestId,
      userId,
      tiktokUrl: formData.tiktokUrl,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    applications.push(newApplication);
    this.saveApplicationsToStorage(applications);

    return newApplication;
  }

  // 応募データを取得
  static async getApplication(applicationId: string): Promise<ApplicationData | null> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const applications = this.getApplicationsFromStorage();
    return applications.find(app => app.id === applicationId) || null;
  }

  // ユーザーの応募一覧を取得
  static async getUserApplications(userId: string): Promise<ApplicationData[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const applications = this.getApplicationsFromStorage();
    return applications.filter(app => app.userId === userId);
  }

  // コンテストへの応募状況をチェック
  static async checkApplicationStatus(contestId: string, userId: string): Promise<ApplicationData | null> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const applications = this.getApplicationsFromStorage();
    return applications.find(app => app.contestId === contestId && app.userId === userId) || null;
  }

  // 下書きを保存
  static saveDraft(contestId: string, userId: string, formData: Partial<ApplicationFormData>): void {
    const draftKey = `draft_${contestId}_${userId}`;
    try {
      localStorage.setItem(draftKey, JSON.stringify({
        ...formData,
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }

  // 下書きを取得
  static getDraft(contestId: string, userId: string): Partial<ApplicationFormData> | null {
    const draftKey = `draft_${contestId}_${userId}`;
    try {
      const data = localStorage.getItem(draftKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get draft:', error);
      return null;
    }
  }

  // 下書きを削除
  static deleteDraft(contestId: string, userId: string): void {
    const draftKey = `draft_${contestId}_${userId}`;
    try {
      localStorage.removeItem(draftKey);
    } catch (error) {
      console.error('Failed to delete draft:', error);
    }
  }

  // TikTok URLの妥当性をチェック
  static validateTikTokUrl(url: string): { isValid: boolean; error?: string } {
    if (!url.trim()) {
      return { isValid: false, error: 'TikTok URLを入力してください' };
    }

    // TikTok URLの基本的なパターンチェック
    const tiktokUrlPattern = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
    
    if (!tiktokUrlPattern.test(url)) {
      return { isValid: false, error: '有効なTikTok URLを入力してください' };
    }

    return { isValid: true };
  }

  // ハッシュタグを解析
  static parseHashtags(text: string): string[] {
    const hashtags = text.match(/#[\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g) || [];
    return hashtags.map(tag => tag.toLowerCase()).filter((tag, index, arr) => arr.indexOf(tag) === index);
  }

  // 応募統計を取得
  static async getApplicationStats(userId: string): Promise<{
    total: number;
    submitted: number;
    approved: number;
    rejected: number;
    winner: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const applications = this.getApplicationsFromStorage().filter(app => app.userId === userId);

    return {
      total: applications.length,
      submitted: applications.filter(app => app.status === 'submitted').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      winner: applications.filter(app => app.status === 'winner').length,
    };
  }
} 