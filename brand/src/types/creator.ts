/**
 * クリエイター関連の型定義
 */
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