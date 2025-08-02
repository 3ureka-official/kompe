import supabase from '@/lib/supabase';
import { Contest, FormAssetItem, InspirationItem } from '@/types/Contest';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '@/lib/storage';


/** 
 * コンテストを作成
 * @param brandId ブランドID
 * @param contestData コンテストデータ
 * @param thumbnailFile サムネイルファイル
 * @param assetsData アセット
 * @param inspirationData インスピレーション
 * @returns 作成されたコンテストのID
 */

/* ---------- ユーティリティ ---------- */
const getExt = (fileName: string) => fileName.split('.').pop() ?? 'bin';


export const createContest = async (
  brandId: string,
  contestData: Omit<
    Contest,
    'id' | 'created_at' | 'status' | 'brandId' | 'thumbnail_url'
  >,
  thumbnailFile: File | null,
  assetsData: FormAssetItem[] | null,
  inspirationData: Omit<
    InspirationItem,
    'id' | 'created_at' | 'brand_id' | 'contest_id'
  >[] | null
): Promise<string> => {
  const contestId = uuidv4();

  // 1) Generate signed URL & upload thumbnail
  let thumbnailKey = '';
  if (thumbnailFile) {
    const ext = getExt(thumbnailFile.name);
    thumbnailKey = `contests/${contestId}/thumbnail.${ext}`;
    const { data: thumbData, error: thumbErr } = await supabase.functions.invoke(
      'get_upload_url',
      {
        body: JSON.stringify({ key: thumbnailKey, expiresIn: 120 }),
      }
    );
    if (thumbErr) throw thumbErr;
    const signedUrl = (thumbData as any).signedUrl;
    if (!signedUrl) throw new Error('Failed to get signedUrl for thumbnail');
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': thumbnailFile.type },
      body: thumbnailFile,
    });
    if (!uploadRes.ok) {
      throw new Error(`Thumbnail upload failed: ${uploadRes.statusText}`);
    }
  }

  // 2) Generate signed URLs & upload assets
  const assetKeys: string[] = [];
  if (assetsData) {
    for (const asset of assetsData) {
      if (asset.file) {
        const ext = getExt(asset.file.name);
        const key = `contests/${contestId}/assets/${uuidv4()}.${ext}`;
        const { data: assetData, error: assetErr } = await supabase.functions.invoke(
          'get_upload_url',
          { body: JSON.stringify({ key, expiresIn: 120 }) }
        );
        if (assetErr) throw assetErr;
        const assetSignedUrl = (assetData as any).signedUrl;
        if (!assetSignedUrl) throw new Error('Failed to get signedUrl for asset');
        const res = await fetch(assetSignedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': asset.file.type },
          body: asset.file,
        });
        if (!res.ok) throw new Error(`Asset upload failed: ${res.statusText}`);
        assetKeys.push(key);
      }
    }
  }

  // 3) Call create_contest for DB insert
  const { data, error } = await supabase.functions.invoke(
    'create_contest',
    {
      body: JSON.stringify({
        brandId,
        contestData,
        thumbnailKey,
        assetKeys,
        inspirations: inspirationData || [],
      }),
    }
  );
  if (error) throw error;
  const result = data as { contestId: string };
  if (!result || !result.contestId) {
    throw new Error('Invalid response from create_contest');
  }

  return result.contestId;
};




/**
 * コンテストを更新
 * @param contestData コンテストデータ
 * @returns 更新されたコンテストのID
 */
export const updateContest = async (contestData: Contest) => {
    try {
        const { data, error } = await supabase.from('contests').update(contestData).eq('id', contestData.id).select('*').single();

        if (error) {
            throw new Error(error.message);
        }

        return data?.id;
    } catch (error) {
        console.error('コンテスト作成エラー:', error);
        throw error;
    }
};

/**
 * コンテストを取得
 * @param brandId ブランドID
 * @returns ユーザーのコンテスト
 */
export const getContests = async (brandId: string) => {
    const { data } = await supabase.from('contests').select('*').eq('brandId', brandId);
    return data as Contest[];
};

/**
 * コンテストを取得
 * @param id コンテストID
 * @returns コンテスト
 */
export const getContestById = async (id: string) => {
    const { data } = await supabase.from('contests').select('*').eq('id', id).single();
    return data as Contest;
};

/**
 * コンテストを削除
 * @param id コンテストID
 */
export const deleteContest = async (id: string) => {
    const { error } = await supabase.from('contests').delete().eq('id', id);
    if (error) {
        throw new Error(error.message);
    }
};

/**
 * コンテストの統計情報を取得
 * @param contestId コンテストID
 * @returns コンテストの統計情報
 */
export const getContestCount = async (brandId: string) => { 
    const { data, error } = await supabase.from('contests').select('*', { count: 'exact' }).eq('brandId', brandId);
    if (error) {
        throw new Error(error.message);
    }
    return data?.length;
};