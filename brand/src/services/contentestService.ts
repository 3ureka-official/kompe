import supabase from '@/lib/supabase';
import { Contest } from '@/types/contest';


/** 
 * コンテストを作成
 * @param contestData コンテストデータ
 * @returns 作成されたコンテストのID
 */
export const createContest = async (contestData: Omit<Contest, 'id'>) => {
    try {
        const { data, error } = await supabase.from('contests').insert(contestData).select('*').single();

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