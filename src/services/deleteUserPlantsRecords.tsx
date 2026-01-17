import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../utils/firebase";

const COLLECTION_NAME = "plantRecords";

// 유저의 식물기록 삭제
const deleteUserPlantsRecords = async (params: {
  recordId: string;
  plantImgUrl?: string | null;
  thumbnailImgUrl?: string | null;
}): Promise<void> => {
  if (!db) throw new Error("Firestore 초기화 실패");
  if (!storage) throw new Error("Storage 초기화 실패");

  const { recordId, plantImgUrl, thumbnailImgUrl } = params;

  const tasks: Promise<void>[] = [];
  if (plantImgUrl) tasks.push(deleteObject(ref(storage, plantImgUrl)));
  if (thumbnailImgUrl) tasks.push(deleteObject(ref(storage, thumbnailImgUrl)));

  await Promise.all(tasks);

  await deleteDoc(doc(db, COLLECTION_NAME, recordId));
};

export default deleteUserPlantsRecords;
