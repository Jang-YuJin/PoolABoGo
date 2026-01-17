import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

// 유저의 식물기록 삭제
const deleteUserPlantsRecords = async (recordId: string): Promise<void> => {
  const docRef = doc(db, "plantRecords", recordId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      recordStatus: false,
      updateDt: new Date()
    });
  } else {
    throw new Error("해당 문서를 찾을 수 없습니다.");
  }
};

export default deleteUserPlantsRecords;
