import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  hasBrand: boolean;
  brandId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandData {
  id: string;
  name: string;
  logoUrl?: string;
  email: string;
  phoneNumber?: string;
  description: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ユーザープロフィールを取得
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('ユーザープロフィール取得エラー:', error);
    throw error;
  }
}

// ユーザープロフィールを作成
export async function createUserProfile(user: User): Promise<UserProfile> {
  try {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      hasBrand: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  } catch (error) {
    console.error('ユーザープロフィール作成エラー:', error);
    throw error;
  }
}

// ブランドを作成
export async function createBrand(brandData: Omit<BrandData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const brandId = `brand_${Date.now()}`;
    const brand: BrandData = {
      ...brandData,
      id: brandId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // ブランドを作成
    await setDoc(doc(db, 'brands', brandId), brand);

    // ユーザープロフィールを更新
    await updateDoc(doc(db, 'users', brandData.ownerId), {
      hasBrand: true,
      brandId: brandId,
      updatedAt: new Date(),
    });

    return brandId;
  } catch (error) {
    console.error('ブランド作成エラー:', error);
    throw error;
  }
}

// ユーザーのブランド情報を取得
export async function getUserBrand(uid: string): Promise<BrandData | null> {
  try {
    const userProfile = await getUserProfile(uid);
    if (!userProfile || !userProfile.brandId) {
      return null;
    }

    const brandDoc = await getDoc(doc(db, 'brands', userProfile.brandId));
    if (brandDoc.exists()) {
      const data = brandDoc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as BrandData;
    }
    return null;
  } catch (error) {
    console.error('ブランド情報取得エラー:', error);
    throw error;
  }
} 