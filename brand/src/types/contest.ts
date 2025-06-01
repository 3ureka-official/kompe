// コンテスト関連の型定義
export type Contest = {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  prizePool: number;
  status: 'ready' | 'active' | 'ended';
  thumbnail: string;
  stats: {
    videos: number;
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
};

export type ContestDetail = Contest & {
  description: string;
  requirements: string[];
  imageVideos?: string[];
};

export type CreatorSubmission = {
  id: string;
  creatorName: string;
  profileImage: string;
  postDate: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  thumbnailUrl: string;
};

export type Application = {
  id: string;
  contestId: string;
  creatorId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  metrics: {
    views: number;
    likes: number;
  };
  submittedAt: Date;
};

// クリエイター関連の型定義
export type Creator = {
  id: string;
  username: string;
  name: string;
  profileImage: string;
  stats: {
    views: number;
    shares: number;
    comments: number;
  };
  reward: number;
  adCode: string;
};

// モックデータ
export const mockCreators: Creator[] = [
  {
    id: '1',
    username: 'baeb__8',
    name: 'Mukonazwothe Khabubu',
    profileImage: '/images/creators/baeb.jpg',
    stats: {
      views: 69100,
      shares: 256,
      comments: 61,
    },
    reward: 500,
    adCode: '#6jzwnYnkOoRjj4ps',
  },
  {
    id: '2',
    username: 'lordmust',
    name: 'lordmust Sadulloev',
    profileImage: '/images/creators/lordmust.jpg',
    stats: {
      views: 33000,
      shares: 0,
      comments: 13,
    },
    reward: 200,
    adCode: '#DNT6j6eqtonvjua0',
  },
  {
    id: '3',
    username: 'glen_versoza',
    name: 'Glen Versoza',
    profileImage: '/images/creators/glen.jpg',
    stats: {
      views: 27700,
      shares: 6,
      comments: 8,
    },
    reward: 100,
    adCode: '#KeQGRKkOtU70G',
  },
  {
    id: '4',
    username: 'jewelgolds',
    name: 'Jewel Gold',
    profileImage: '/images/creators/jewel.jpg',
    stats: {
      views: 7962,
      shares: 1,
      comments: 10,
    },
    reward: 100,
    adCode: '#Rm82c/rxJB11/llO',
  },
];

export const mockSubmissions: CreatorSubmission[] = [
  {
    id: '1',
    creatorName: '@summer_photo_jp',
    profileImage: '/images/creators/profile1.jpg',
    postDate: '2024-07-15T09:00:00',
    views: 15000,
    likes: 1200,
    comments: 45,
    shares: 67,
    videoUrl: 'https://example.com/video1',
    thumbnailUrl: '/images/submissions/thumb1.jpg',
  },
  {
    id: '2',
    creatorName: '@beach_life',
    profileImage: '/images/creators/profile2.jpg',
    postDate: '2024-07-16T15:30:00',
    views: 22000,
    likes: 1800,
    comments: 92,
    shares: 124,
    videoUrl: 'https://example.com/video2',
    thumbnailUrl: '/images/submissions/thumb2.jpg',
  },
];

export const mockContests: Contest[] = [
  {
    id: '1',
    title: '夏の思い出フォトコンテスト',
    category: '写真',
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    prizePool: 500000,
    status: 'active',
    thumbnail: '/images/summer-photo.jpg',
    stats: {
      videos: mockSubmissions.length,
      views: mockSubmissions.reduce((sum, s) => sum + s.views, 0),
      likes: mockSubmissions.reduce((sum, s) => sum + s.likes, 0),
      comments: mockSubmissions.reduce((sum, s) => sum + s.comments, 0),
      shares: mockSubmissions.reduce((sum, s) => sum + s.shares, 0),
    },
  },
  {
    id: '2',
    title: '秋の食べ物紹介コンテスト',
    category: 'フード',
    startDate: '2024-09-01',
    endDate: '2024-10-31',
    prizePool: 300000,
    status: 'ready',
    thumbnail: '/images/autumn-food.jpg',
    stats: {
      videos: 0,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
    },
  },
];

export const mockContestDetail: ContestDetail = {
  id: '1',
  title: '夏の思い出フォトコンテスト',
  category: '写真',
  startDate: '2024-07-01',
  endDate: '2024-08-31',
  prizePool: 500000,
  status: 'active',
  thumbnail: '/images/summer-photo.jpg',
  description: 'あなたの夏の思い出を共有しよう！最高の夏の瞬間を切り取った写真を募集します。',
  requirements: [
    '夏をテーマにした写真であること',
    '応募者本人が撮影した写真であること',
    '人物が写っている場合は投稿の許可を得ていること',
  ],
  imageVideos: [
    'https://www.tiktok.com/@summer_photo_jp/video/1728430',
    'https://www.tiktok.com/@beach_memories/video/1729845',
    'https://www.tiktok.com/@sunset_vibes/video/1730123',
  ],
  stats: {
    videos: mockSubmissions.length,
    views: mockSubmissions.reduce((sum, s) => sum + s.views, 0),
    likes: mockSubmissions.reduce((sum, s) => sum + s.likes, 0),
    comments: mockSubmissions.reduce((sum, s) => sum + s.comments, 0),
    shares: mockSubmissions.reduce((sum, s) => sum + s.shares, 0),
  },
}; 