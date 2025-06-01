import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, getDoc, doc, updateDoc } from 'firebase/firestore';
import { Contest } from '@/types/contest';

export const createContest = async (contest: Contest) => {
    const docRef = await addDoc(collection(db, 'contests'), contest);
    return docRef.id;
};

export const getContestById = async (id: string) => {
    const docRef = doc(db, 'contests', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Contest;
    } else {
        throw new Error('Contest not found');
    }
};

export const updateContest = async (id: string, contest: Partial<Contest>) => {
    const docRef = doc(db, 'contests', id);
    await updateDoc(docRef, contest);
};