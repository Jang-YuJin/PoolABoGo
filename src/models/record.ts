import { Timestamp } from 'firebase/firestore';

// 식물 상태
export const PlantStatus = {
  HEALTHY: 'healthy', // 건강
  WARNING: 'warning', // 주의
  CRITICAL: 'critical', // 위험험
  UNKNOWN: 'unknown' // 알 수 없음
} as const;

// PlantStatus 타입 정의
export type PlantStatusType = typeof PlantStatus[keyof typeof PlantStatus];

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
  createDt: Timestamp; // 레코드 생성 일시
  createId: string; // 레코드 생성자 ID
  updateDt: Timestamp; // 레코드 마지막 수정 일시
  updateId: string; // 레코드 마지막 수정자 ID
}
