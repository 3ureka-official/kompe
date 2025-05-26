import { Contest, Application, Brand } from './contest';

export const mockContests: Contest[] = [
  {
    id: 'contest-1',
    title: '新商品PRキャンペーン',
    imageUrl: 'https://placehold.co/600x400',
    description: '新商品の使用レビュー動画を募集します！最高の動画には豪華賞金をご用意！',
    startAt: new Date('2024-04-01'),
    endAt: new Date('2024-04-30'),
    prizePool: 30000,
    rewards: [
      { rank: 1, amount: 10000 },
      { rank: 2, amount: 5000 },
      { rank: 3, amount: 3000 },
    ],
    criteria: 'views',
    status: 'active',
  },
  {
    id: 'contest-2',
    title: '店舗紹介コンテスト',
    imageUrl: 'https://placehold.co/600x400',
    description: '当店の魅力を伝える動画を募集中！独創的な視点での撮影をお待ちしています。',
    startAt: new Date('2024-04-15'),
    endAt: new Date('2024-05-15'),
    prizePool: 50000,
    rewards: [
      { rank: 1, amount: 20000 },
      { rank: 2, amount: 15000 },
      { rank: 3, amount: 10000 },
    ],
    criteria: 'likes',
    status: 'upcoming',
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    contestId: 'contest-1',
    creatorId: 'creator-1',
    videoUrl: 'https://example.com/video1',
    thumbnailUrl: 'https://placehold.co/300x200',
    title: '商品レビュー動画',
    description: '実際に使ってみた感想です！',
    metrics: {
      views: 1500,
      likes: 200,
    },
    submittedAt: new Date('2024-04-02'),
  },
  {
    id: 'app-2',
    contestId: 'contest-1',
    creatorId: 'creator-2',
    videoUrl: 'https://example.com/video2',
    thumbnailUrl: 'https://placehold.co/300x200',
    title: '使用レビュー＆解説',
    description: '商品の特徴を詳しく解説！',
    metrics: {
      views: 2500,
      likes: 350,
    },
    submittedAt: new Date('2024-04-03'),
  }
];

export const mockBrands: Brand[] = [
  {
    id: 'brand-1',
    name: 'テストブランド株式会社',
    logoUrl: 'https://placehold.co/200x200',
    description: '革新的な製品を提供する企業です',
    contact: 'contact@example.com',
  }
]; 