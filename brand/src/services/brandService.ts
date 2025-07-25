import { getSupabaseClient } from '@/lib/supabase';
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
  ): Promise<Brand> {
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

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('brands').insert(brandData).select('*').single();

    if (error) {
      throw new Error('ブランド作成エラー:', error);
    }

    // ブランドを作成
    const brand: Brand = {
      ...data,
      userId: userId,
    };
    
    return brand;
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

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('brands').select('*').eq('user_id', uid).single();

    if (error) {
      throw new Error('ブランド情報取得エラー:', error);
    }
    
    return data as Brand;
  } catch (error) {
    console.error('ブランド情報取得エラー:', error);
    throw error;
  }
} 