import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import type { PlantRecord } from "../models/record";

const COLLECTION_NAME = "plantRecords";

export type PlantRecordsPage = {
  items: PlantRecord[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
};

// 유저의 저장된 식물 데이터 가져오기
const getUserPlantsRecords = async (params: {
  userId: string;
  pageSize: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}): Promise<PlantRecordsPage> => {
  if (!db) throw new Error("Firestore 초기화 실패");

  const { userId, pageSize, lastDoc = null } = params;

  const base = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
    where("recordStatus", "==", true),
    orderBy("createDt", "desc"),
    limit(pageSize)
  );

  const q = lastDoc ? query(base, startAfter(lastDoc)) : base;
  const snap = await getDocs(q);

  const items = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<PlantRecord, "id">),
  })) as PlantRecord[];

  const nextLastDoc = snap.docs.length ? snap.docs[snap.docs.length - 1] : null;

  return { items, lastDoc: nextLastDoc };
};

export default getUserPlantsRecords;
