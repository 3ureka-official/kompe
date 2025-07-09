import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Application } from '@/types/application';

/**
 * 指定されたコンテストIDのアプリケーションを取得
 */
export async function getApplicationsByContestId(contestId: string): Promise<Application[]> {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(applicationsRef, where('contestId', '==', contestId));
    const querySnapshot = await getDocs(q);
    
    const applications: Application[] = [];
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data()
      } as Application);
    });
    
    return applications;
  } catch (error) {
    console.error('アプリケーション取得エラー:', error);
    throw error;
  }
}

/**
 * 指定されたクリエイターのアプリケーションを取得
 */
export async function getApplicationsByCreatorId(creatorId: string): Promise<Application[]> {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(applicationsRef, where('creatorId', '==', creatorId));
    const querySnapshot = await getDocs(q);
    
    const applications: Application[] = [];
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data()
      } as Application);
    });
    
    return applications;
  } catch (error) {
    console.error('アプリケーション取得エラー:', error);
    throw error;
  }
} 