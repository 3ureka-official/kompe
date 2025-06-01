// 通知関連の型定義
export type Notification = {
  id: string;
  type: 'contest' | 'application' | 'system' | 'marketing';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
};

// モックデータ
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'contest',
    title: 'コンテスト応募がありました',
    message: '「夏のファッションコンテスト」に新しい応募がありました。',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
    actionUrl: '/dashboard/contests/1'
  },
  {
    id: '2',
    type: 'application',
    title: 'クリエイターが参加申請しました',
    message: '@fashionista_yuki さんがコンテストへの参加を申請しました。',
    timestamp: '2024-01-15T09:15:00Z',
    isRead: false,
    actionUrl: '/dashboard/contests/1/participants'
  },
  {
    id: '3',
    type: 'system',
    title: 'コンテスト期間が終了しました',
    message: '「春のライフスタイルコンテスト」の応募期間が終了しました。結果発表の準備をしてください。',
    timestamp: '2024-01-14T23:59:00Z',
    isRead: true,
    actionUrl: '/dashboard/contests/2/results'
  },
  {
    id: '4',
    type: 'marketing',
    title: '新機能のお知らせ',
    message: 'コンテスト分析機能が追加されました。詳細な統計情報を確認できます。',
    timestamp: '2024-01-14T14:20:00Z',
    isRead: true
  },
  {
    id: '5',
    type: 'contest',
    title: 'コンテスト公開されました',
    message: '「冬のアクセサリーコンテスト」が正常に公開されました。',
    timestamp: '2024-01-13T16:45:00Z',
    isRead: true,
    actionUrl: '/dashboard/contests/3'
  }
];