import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { PlantRecord } from "../models/record";

export async function getBookmarkedPlants(userId: string): Promise<PlantRecord[]> {
    try {
        const recordsRef = collection(db, "plantRecords");

        // userId가 일치하고, isBookmarked가 true인 데이터만 조회함
        const q = query(
            recordsRef,
            where("userId", "==", userId),
            where("recordStatus", "==", true),
            where("isBookmarked", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const bookmarkedPlants: PlantRecord[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data
            } as PlantRecord;
        });

        return bookmarkedPlants;
    } catch (error) {
        console.error("즐겨찾기 목록을 불러오는 중 오류 발생:", error);
        throw error;
    }
}

export async function toggleBookmarkById(docId: string): Promise<boolean> {
    const docRef = doc(db, "plantRecords", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const currentStatus = docSnap.data().isBookmarked || false;
        const newStatus = !currentStatus;

        await updateDoc(docRef, {
            isBookmarked: newStatus,
            updateDt: new Date()
        });

        return newStatus;
    } else {
        throw new Error("해당 문서를 찾을 수 없습니다.");
    }
}
