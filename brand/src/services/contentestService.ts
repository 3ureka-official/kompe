import { getSupabaseClient } from '@/lib/supabase';
import { Contest } from '@/types/contest';

/** 
 * コンテストを作成
 * @param contestData コンテストデータ
 * @returns 作成されたコンテストのID
 */
export const createContest = async (contestData: Omit<Contest, 'id'>) => {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from('contests').insert(contestData).select('*').single();
        return data?.id;
    } catch (error) {
        console.error('コンテスト作成エラー:', error);
        throw new Error('コンテストの作成に失敗しました');
    }
};

/**
 * コンテストを更新
 * @param contestData コンテストデータ
 * @returns 更新されたコンテストのID
 */
export const updateContest = async (contestData: Contest) => {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from('contests').update(contestData).eq('id', contestData.id).select('*').single();
        return data?.id;
    } catch (error) {
        console.error('コンテスト作成エラー:', error);
        throw new Error('コンテストの作成に失敗しました');
    }
};

/**
 * コンテストを取得
 * @param brandId ブランドID
 * @returns ユーザーのコンテスト
 */
export const getContests = async (brandId: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('contests').select('*').eq('brandId', brandId);
    return data as Contest[];
};

/**
 * コンテストを取得
 * @param id コンテストID
 * @returns コンテスト
 */
export const getContestById = async (id: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('contests').select('*').eq('id', id).single();
    return data as Contest;
};

/**
 * コンテストを削除
 * @param id コンテストID
 */
export const deleteContest = async (id: string) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('contests').delete().eq('id', id);
    if (error) {
        throw new Error('コンテストの削除に失敗しました');
    }
};

/**
 * コンテストの統計情報を取得
 * @param contestId コンテストID
 * @returns コンテストの統計情報
 */
export const getContestCount = async (brandId: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('contests').select('*', { count: 'exact' }).eq('brandId', brandId);
    return data?.length;
};