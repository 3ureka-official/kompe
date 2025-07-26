import { getSupabaseClient } from '@/lib/supabase';
import { Brand } from '@/types/Brand';
import { updateUser } from './userService';

/**
 * ブランドを作成
 * @param userId ユーザーID
 * @param brandData ブランドデータ
 * @returns 作成されたブランドのID
 */
export async function createBrand(
  userId: string, 
  brandData: Omit<Brand, 'id' | 'created_at'>
  ): Promise<Brand> {
  try {
    const supabase = getSupabaseClient();
    const { data: brand, error } = await supabase.from('brands').insert(brandData).select('*').single();

    if (error) {
      throw error;
    }

    await updateUser(userId, { brand_id: brand.id });
    
    return brand;
  } catch (error) {
    console.error('ブランド作成エラー:', error);
    throw error;
  }
}

/**
 * ブランドを作成
 * @param brandId ブランドID
 * @param brandData ブランドデータ
 * @returns 作成されたブランドのID
 */
export async function updateBrand(
  brandId: string,
  brandData: Omit<Brand, 'id' | 'created_at'>
  ): Promise<Brand> {
  try {

    const supabase = getSupabaseClient();
    const { data: brand, error } = await supabase.from('brands').update(brandData).eq('id', brandId).select('*').single();

    if (error) {
      throw error;
    }
    
    return brand;
  } catch (error) {
    console.error('ブランド更新エラー:', error);
    throw error;
  }
}

/**
 * ユーザーのブランド情報を取得
 * @param brandId ユーザーID
 * @returns ブランド情報
 */
export async function getUserBrand(brandId: string): Promise<Brand | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('brands').select('*').eq('id', brandId).single();

    if (error) {
      throw error;
    }
    
    return data as Brand;
  } catch (error) {
    console.error('ブランド情報取得エラー:', error);
    throw error;
  }
} 