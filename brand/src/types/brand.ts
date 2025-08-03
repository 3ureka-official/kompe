// ブランド関連の型定義
export interface Brand {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  email: string;
  phonenumber: string;
  website: string | null;
  tiktok_username: string | null;
  instagram_url: string | null;
  created_at: Date | string;
}

// モックデータ
export const mockBrands: Brand[] = [
  {
    id: "1",
    name: "ABC株式会社",
    logo_url: "/images/brands/abc-logo.png",
    email: "contact@abc-corp.com",
    phonenumber: "03-1234-5678",
    description:
      "私たちABC株式会社は、革新的な技術と伝統的な職人技を融合させ、お客様の生活をより豊かにする製品を提供しています。創業以来50年間、品質と信頼を第一に、持続可能な社会の実現に向けて取り組んでいます。",
    website: null,
    tiktok_username: null,
    instagram_url: null,
    created_at: new Date(),
  },
  {
    id: "2",
    name: "デザインスタジオXYZ",
    logo_url: "/images/brands/xyz-logo.png",
    email: "info@xyz-design.com",
    phonenumber: "06-9876-5432",
    description:
      "デザインスタジオXYZは、クリエイティブな発想と最新のデザイン技術を駆使して、ブランドの魅力を最大限に引き出すデザインソリューションを提供しています。お客様と共に創り上げる、心に響くデザインを目指しています。",
    website: null,
    tiktok_username: null,
    instagram_url: null,
    created_at: new Date(),
  },
  {
    id: "3",
    name: "グリーンテック合同会社",
    logo_url: "/images/brands/greentech-logo.png",
    email: "support@greentech.co.jp",
    phonenumber: "052-111-2222",
    description:
      "環境に優しい技術開発を通じて、持続可能な未来を創造するグリーンテック合同会社です。再生可能エネルギーとスマートテクノロジーを組み合わせた革新的なソリューションで、地球環境の保護に貢献しています。",
    website: null,
    tiktok_username: null,
    instagram_url: null,
    created_at: new Date(),
  },
];
