import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Brand } from '@/types/brand';

/**
 * ブランドを作成
 * @param userId ユーザーID
 * @param brandData ブランドデータ
 * @returns 作成されたブランドのID
 */
export async function createBrand(
  userId: string, 
  brandData: Omit<Brand, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    if (!userId) {
      throw new Error('ユーザーIDが必要です');
    }

    // 必須フィールドのバリデーション
    if (!brandData.name?.trim()) {
      throw new Error('ブランド名が必要です');
    }
    if (!brandData.contactEmail?.trim()) {
      throw new Error('連絡先メールアドレスが必要です');
    }

    // 既存のブランドが存在するかチェック
    const existingBrand = await getUserBrand(userId);
    if (existingBrand) {
      throw new Error('既にブランドが登録されています');
    }

    const brandId = doc(collection(db, 'brands')).id;
    const brand: Brand = {
      ...brandData,
      id: brandId,
      userId: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // ブランドを作成
    await setDoc(doc(db, 'brands', brandId), brand);

    return brandId;
  } catch (error) {
    console.error('ブランド作成エラー:', error);
    throw error;
  }
}

/**
 * ユーザーのブランド情報を取得
 * @param uid ユーザーID
 * @returns ブランド情報
 */
export async function getUserBrand(uid: string): Promise<Brand | null> {
  try {
    if (!uid) {
      return null;
    }

    const brandsQuery = query(
      collection(db, 'brands'),
      where('userId', '==', uid)
    );

    const querySnapshot = await getDocs(brandsQuery);
    
    if (!querySnapshot.empty) {
      const brandDoc = querySnapshot.docs[0];
      const data = brandDoc.data();
      return data as Brand;
    }
    
    return null;
  } catch (error) {
    console.error('ブランド情報取得エラー:', error);
    throw error;
  }
} 