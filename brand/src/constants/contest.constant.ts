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

import type { ContestCreateFormData } from "@/schema/createContestSchema";

export const ContestFormDefaultValues: ContestCreateFormData = {
  title: "",
  thumbnail_url: "",
  entry_start_date: new Date(),
  entry_end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
  video_production_start_date: new Date(
    new Date().setDate(new Date().getDate() + 7),
  ),
  video_production_end_date: new Date(
    new Date().setDate(new Date().getDate() + 14),
  ),
  contest_start_date: new Date(new Date().setDate(new Date().getDate() + 14)),
  contest_end_date: new Date(new Date().setDate(new Date().getDate() + 21)),
  description: "",
  requirements: "",
  prize_pool: 50000,
  prize_distribution: [50000],
  requires_purchase_proof: false,
  purchase_product_name: null,
  purchase_product_url: null,
  purchase_description: null,
  has_sample: false,
  sample_product_name: null,
  sample_rental_or_purchase: null,
  sample_price_per_creator: null,
  sample_return_postal_code: null,
  sample_return_prefecture: null,
  sample_return_city: null,
  sample_return_address_line: null,
};

export const CONTEST_STATUS_LABELS = {
  0: { text: "下書き", color: "bg-gray-100 text-gray-800" },
  1: { text: "開催前", color: "bg-purple-100 text-purple-800" },
  2: { text: "開催中", color: "bg-blue-100 text-blue-800" },
  3: { text: "終了", color: "bg-red-100 text-red-800" },
};

export const CONTEST_STATUS_TYPE_LABELS = {
  draft: { text: "下書き", color: "bg-gray-100 text-gray-800" },
  scheduled: { text: "開催前", color: "bg-purple-100 text-purple-800" },
  holding: { text: "開催中", color: "bg-blue-100 text-blue-800" },
  ended: { text: "終了", color: "bg-red-100 text-red-800" },
} as const;
