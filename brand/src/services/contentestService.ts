import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Contest } from '@/types/contest';

/** 
 * コンテストを作成
 * @param contestData コンテストデータ
 * @returns 作成されたコンテストのID
 */
export const createContest = async (contestData: Omit<Contest, 'id'>) => {
    try {
        const docRef = await addDoc(collection(db, 'contests'), contestData);
        return docRef.id;
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
        const docRef = await updateDoc(doc(db, 'contests', contestData.id), contestData);
        return docRef;
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
    const contestsQuery = query(collection(db, 'contests'), where('brandId', '==', brandId));
    const querySnapshot = await getDocs(contestsQuery);
    return querySnapshot.docs.map(doc => doc.data() as Contest);
};

/**
 * コンテストを取得
 * @param id コンテストID
 * @returns コンテスト
 */
export const getContestById = async (id: string) => {
    const docRef = doc(db, 'contests', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Contest;
    } else {
        throw new Error('Contest not found');
    }
};

/**
 * コンテストを削除
 * @param id コンテストID
 */
export const deleteContest = async (id: string) => {
    const docRef = doc(db, 'contests', id);
    await deleteDoc(docRef);
};

/**
 * コンテストの統計情報を取得
 * @param contestId コンテストID
 * @returns コンテストの統計情報
 */
export const getContestCount = async (brandId: string) => {
    const contestsQuery = query(collection(db, 'contests'), where('brandId', '==', brandId));
    const querySnapshot = await getDocs(contestsQuery);
    return querySnapshot.size;
};