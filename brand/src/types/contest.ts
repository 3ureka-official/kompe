export type Contest = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  startAt: Date;
  endAt: Date;
  prizePool: number;
  rewards: {
    rank: number;
    amount: number;
  }[];
  criteria: 'views' | 'likes' | 'brand';
  status: 'upcoming' | 'active' | 'ended';
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

export type Brand = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  contact: string;
}; 