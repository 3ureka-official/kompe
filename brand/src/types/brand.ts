// ブランド関連の型定義
export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  contactEmail: string;
  phoneNumber: string;
  snsLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  publicProfile: string;
  createdAt: string;
  updatedAt: string;
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

// ブランド認証状態
export interface BrandAuthState {
  isLoggedIn: boolean;
  isRegistered: boolean;
  currentBrand?: Brand;
}

// ブランド申請フォームの型
export interface BrandApplicationForm {
  companyName: string;
  contactName: string;
  contactEmail: string;
  phoneNumber: string;
  businessType: string;
  website?: string;
  description: string;
}

// ブランドログインフォームの型
export interface BrandLoginForm {
  email: string;
  password: string;
}

// モックデータ
export const mockBrands: Brand[] = [
  {
    id: '1',
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
    publicProfile: '私たちABC株式会社は、革新的な技術と伝統的な職人技を融合させ、お客様の生活をより豊かにする製品を提供しています。創業以来50年間、品質と信頼を第一に、持続可能な社会の実現に向けて取り組んでいます。',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'デザインスタジオXYZ',
    logoUrl: '/images/brands/xyz-logo.png',
    contactEmail: 'info@xyz-design.com',
    phoneNumber: '06-9876-5432',
    snsLinks: {
      instagram: 'https://instagram.com/xyz_design',
      website: 'https://xyz-design.com'
    },
    publicProfile: 'デザインスタジオXYZは、クリエイティブな発想と最新のデザイン技術を駆使して、ブランドの魅力を最大限に引き出すデザインソリューションを提供しています。お客様と共に創り上げる、心に響くデザインを目指しています。',
    createdAt: '2024-02-10T11:15:00Z',
    updatedAt: '2024-03-25T16:45:00Z'
  },
  {
    id: '3',
    name: 'グリーンテック合同会社',
    logoUrl: '/images/brands/greentech-logo.png',
    contactEmail: 'support@greentech.co.jp',
    phoneNumber: '052-111-2222',
    snsLinks: {
      twitter: 'https://twitter.com/greentech_jp',
      facebook: 'https://facebook.com/greentech.japan',
      website: 'https://greentech.co.jp'
    },
    publicProfile: '環境に優しい技術開発を通じて、持続可能な未来を創造するグリーンテック合同会社です。再生可能エネルギーとスマートテクノロジーを組み合わせた革新的なソリューションで、地球環境の保護に貢献しています。',
    createdAt: '2024-01-20T08:30:00Z',
    updatedAt: '2024-03-18T13:20:00Z'
  }
]; 