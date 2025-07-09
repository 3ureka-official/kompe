import { FieldValue, serverTimestamp } from "firebase/firestore";

// ブランド関連の型定義
export interface Brand {
  id: string;
  userId: string;
  name: string;
  description: string;
  logoUrl: string;
  contactEmail: string;
  phoneNumber: string;
  snsLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  website?: string;
  tiktokHandle?: string;
  businessType: string;
  howDidYouHear: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

// ブランド作成フォームの型
export interface BrandCreationData {
  name: string;
  logoFile: File | null;
  contactEmail: string;
  phoneNumber: string;
  businessType: string;
  website?: string;
  publicProfile: string;
  snsLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  tiktokHandle?: string;
  howDidYouHear?: string;
}

// モックデータ
export const mockBrands: Brand[] = [
  {
    id: '1',
    userId: '1',
    name: 'ABC株式会社',
    logoUrl: '/images/brands/abc-logo.png',
    contactEmail: 'contact@abc-corp.com',
    phoneNumber: '03-1234-5678',
    snsLinks: {
      twitter: 'https://twitter.com/abc_corp',
      instagram: 'https://instagram.com/abc_corp',
      facebook: 'https://facebook.com/abc.corp',
      website: 'https://abc-corp.com'
    },
    description: '私たちABC株式会社は、革新的な技術と伝統的な職人技を融合させ、お客様の生活をより豊かにする製品を提供しています。創業以来50年間、品質と信頼を第一に、持続可能な社会の実現に向けて取り組んでいます。',
    businessType: '製造業',
    howDidYouHear: 'Google検索',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: '2',
    userId: '2',
    name: 'デザインスタジオXYZ',
    logoUrl: '/images/brands/xyz-logo.png',
    contactEmail: 'info@xyz-design.com',
    phoneNumber: '06-9876-5432',
    snsLinks: {
      instagram: 'https://instagram.com/xyz_design',
      website: 'https://xyz-design.com'
    },
    description: 'デザインスタジオXYZは、クリエイティブな発想と最新のデザイン技術を駆使して、ブランドの魅力を最大限に引き出すデザインソリューションを提供しています。お客様と共に創り上げる、心に響くデザインを目指しています。',
    businessType: 'デザイン',
    howDidYouHear: 'Twitter',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: '3',
    userId: '3',
    name: 'グリーンテック合同会社',
    logoUrl: '/images/brands/greentech-logo.png',
    contactEmail: 'support@greentech.co.jp',
    phoneNumber: '052-111-2222',
    snsLinks: {
      twitter: 'https://twitter.com/greentech_jp',
      facebook: 'https://facebook.com/greentech.japan',
      website: 'https://greentech.co.jp'
    },
    description: '環境に優しい技術開発を通じて、持続可能な未来を創造するグリーンテック合同会社です。再生可能エネルギーとスマートテクノロジーを組み合わせた革新的なソリューションで、地球環境の保護に貢献しています。',
    businessType: '環境技術',
    howDidYouHear: 'Facebook',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
]; 