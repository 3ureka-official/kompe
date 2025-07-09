import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types/user';
import { Brand } from '@/types/brand';


/**
 * ユーザープロフィールを取得
 * @param uid ユーザーID
 * @returns ユーザープロフィール
 */
export async function getUser(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data as User;
    }
    return null;
  } catch (error) {
    console.error('ユーザープロフィール取得エラー:', error);
    throw error;
  }
}

/**
 * ユーザープロフィールを作成
 * @param user ユーザーデータ
 * @returns 作成されたユーザープロフィール
 */
export async function createUser(user: User): Promise<User> {
  try {
    const User: User = {
      id: user.id,
      email: user.email || '',
      name: user.name || '',
      profileImage: user.profileImage || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', user.id), User);
    return User;
  } catch (error) {
    console.error('ユーザープロフィール作成エラー:', error);
    throw error;
  }
}