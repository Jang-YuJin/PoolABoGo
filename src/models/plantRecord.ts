import { QueryDocumentSnapshot, Timestamp, type DocumentData } from 'firebase/firestore';
import type { PlantStatusType } from './common';

// 식물 기록 데이터 모델
export interface PlantRecord {
  id?: string; // 문서 ID (Firestore에서 자동 생성)
  userId: string; // 사용자 ID (Firebase Auth UID)
  plantName: string; // 식물 이름
  plantDesc: string; // 식물 설명
  plantStatus: PlantStatusType | string; // 식물 상태 (PlantStatusType 또는 string)
  plantCaution: string; // 주의사항 
  plantImg: string; // 원본 이미지 URL
  thumbnailImg: string; // 썸네일 이미지 URL(저용량량)
  isBookmarked: boolean; // 책갈피 여부
  recordStatus: boolean; // 레코드 상태 (true: 활성, false: 삭제)
  createDt: Timestamp; // 레코드 생성 일시
  createId: string; // 레코드 생성자 ID
  updateDt: Timestamp; // 레코드 마지막 수정 일시
  updateId: string; // 레코드 마지막 수정자 ID
}

export interface CreatePlantRecordParams {
  imageFile: File;
  userId: string;
  plantName: string;
  plantDesc: string;
  plantStatus: string;
  plantCaution: string;
}

export interface GetPlantRecordsParams {
  userId: string;
  pageSize: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

export type GetPlantRecordsResponse = {
  items: PlantRecord[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
};
