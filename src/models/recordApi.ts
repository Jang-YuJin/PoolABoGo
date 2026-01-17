import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  Timestamp,
  type QueryDocumentSnapshot,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { PlantRecord } from './record';

const COLLECTION_NAME = 'plantRecords';

// 식물 기록 생성 파라미터 인터페이스
export interface CreatePlantRecordParams {
  userId: string;
  plantName: string;
  plantDesc: string;
  plantStatus: string;
  plantCaution: string;
  plantImg: string;
  thumbnailImg: string;
}

// 새로운 식물 기록을 Firestore에 저장
export async function createPlantRecord(params: CreatePlantRecordParams): Promise<string> {
  if (!db) {
    throw new Error('Firebase Firestore가 초기화되지 않았습니다. Firebase 환경 변수를 확인해주세요.');
  }
  try {
    const now = Timestamp.now(); // 서버 시간 생성

    // DB에 저장할 데이터 객체 구성 (id를 제외한 PlantRecord 형태)
    const recordData: Omit<PlantRecord, 'id'> = {
      userId: params.userId,
      plantName: params.plantName,
      plantDesc: params.plantDesc,
      plantStatus: params.plantStatus,
      plantCaution: params.plantCaution,
      plantImg: params.plantImg,
      thumbnailImg: params.thumbnailImg,
      isBookmarked: false,
      createDt: now,
      createId: params.userId,
      updateDt: now,
      updateId: params.userId
    };
    // Firestore에 데이터 저장
    const docRef = await addDoc(collection(db, COLLECTION_NAME), recordData);
    return docRef.id; // 저장된 문서의 ID 반환
  } catch (error) {
    throw new Error(`기록 저장 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

// 사용자의 모든 식물 기록 조회
export async function getPlantRecords(userId: string): Promise<PlantRecord[]> {
  if (!db) {
    throw new Error('Firebase Firestore가 초기화되지 않았습니다. Firebase 환경 변수를 확인해주세요.');
  }
  try {
    // 사용자 ID와 일치하는 문서만 조회하는 쿼리 생성
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);

    // 조회된 문서를 PlantRecord 형태로 변환하여 반환
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data()
    } as PlantRecord));
  } catch (error) {
    throw new Error(`기록 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

// 특정 식물 기록 조회
export async function getPlantRecord(recordId: string): Promise<PlantRecord | null> {
  if (!db) {
    throw new Error('Firebase Firestore가 초기화되지 않았습니다. Firebase 환경 변수를 확인해주세요.');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, recordId); // 특정 식물 기록 문서 참조
    const docSnap = await getDoc(docRef); // 문서 내용 조회
    
    // 문서가 존재하지 않으면 null 반환
    if (!docSnap.exists()) {
      return null;
    }
    
    // 문서 내용을 PlantRecord 형태로 변환하여 반환
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as PlantRecord;
  } catch (error) {
    throw new Error(`기록 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}
