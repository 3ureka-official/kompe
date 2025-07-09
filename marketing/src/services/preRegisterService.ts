import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface PreCreatorData {
  email: string;
  tiktokHandle: string;
}

export interface PreBrandData {
  email: string;
  name: string;
  brandName: string;
  website?: string;
  industry: string;
}

export const savePreCreator = async (data: PreCreatorData) => {
  try {
    const docRef = await addDoc(collection(db, 'pre_creator'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    
    console.log('Document written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('データの保存に失敗しました');
  }
};

export const savePreBrand = async (data: PreBrandData) => {
  try {
    const docRef = await addDoc(collection(db, 'pre_brand'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    
    console.log('Document written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('データの保存に失敗しました');
  }
}; 