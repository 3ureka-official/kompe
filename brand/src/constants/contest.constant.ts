export const CONTEST_PLANS = [
  { value: 100000, label: "10万円", textColor: "text-amber-600" },
  { value: 300000, label: "30万円", textColor: "text-gray-600" },
  { value: 500000, label: "50万円", textColor: "text-yellow-600" },
];

export const CONTEST_CATEGORIES = [
  { id: "fashion", label: "アパレル・ファッション" },
  { id: "beauty", label: "美容・コスメ" },
  { id: "health", label: "ヘルス・フィットネス" },
  { id: "music", label: "音楽" },
  { id: "game", label: "ゲーム" },
  { id: "sports", label: "スポーツ・アウトドア" },
  { id: "technology", label: "テクノロジー" },
  { id: "hobby", label: "ホビー・エンタメ" },
  { id: "business", label: "ビジネス" },
  { id: "food", label: "フード・グルメ" },
  { id: "pet", label: "ペット" },
  { id: "hotel", label: "ホテル・旅行" },
  { id: "other", label: "その他" },
];

export const ContestFormDefaultValues = {
  title: "",
  thumbnail_url: "",
  contest_start_date: new Date(),
  contest_end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
  description: "",
  supply_of_samples: "",
  video_conditions: "",
  requirements: "",
  prize_pool: 0,
  prize_distribution: [0, 0, 0],
};

export const CONTEST_STATUS_LABELS = {
  0: { text: "下書き", color: "bg-gray-100 text-gray-800" },
  1: { text: "予定", color: "bg-yellow-100 text-yellow-800" },
  2: { text: "応募期間", color: "bg-green-100 text-green-800" },
  3: { text: "開催中", color: "bg-blue-100 text-blue-800" },
  4: { text: "終了", color: "bg-red-100 text-red-800" },
};
