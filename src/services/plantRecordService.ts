import { compressImage, generateThumbnail, isImageFile } from '../utils/imageCompression';
import { uploadImage, uploadThumbnail } from '../utils/storage';
import { createPlantRecord, type CreatePlantRecordParams } from '../models/recordApi';

// 식물 기록 저장 파라미터 인터페이스
export interface SavePlantRecordParams {
  imageFile: File;
  userId: string;
  plantName: string;
  plantDesc: string;
  plantStatus: string;
  plantCaution: string;
}

// 식물 기록 저장 함수
export async function savePlantRecord(params: SavePlantRecordParams): Promise<string> {
  const { imageFile, userId, plantName, plantDesc, plantStatus, plantCaution } = params;

  // 이미지 파일 여부 확인
  if (!isImageFile(imageFile)) {
    throw new Error('이미지 파일이 아닙니다.');
  }

  const plantId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`; // 식물 기록 ID 생성

  const compressedImage = await compressImage(imageFile); // 원본 이미지 압축
  const thumbnailImage = await generateThumbnail(imageFile); // 썸네일 이미지 생성

  // 원본 이미지와 썸네일 이미지 업로드
  const [plantImg, thumbnailImg] = await Promise.all([
    uploadImage(compressedImage, userId, plantId), // 원본 이미지 업로드
    uploadThumbnail(thumbnailImage, userId, plantId) // 썸네일 이미지 업로드
  ]);

  // Firestore 저장 데이터 구성
  const recordParams: CreatePlantRecordParams = {
    userId,
    plantName,
    plantDesc,
    plantStatus,
    plantCaution,
    plantImg,
    thumbnailImg
  };

  // Firestore에 식물 기록 저장
  const recordId = await createPlantRecord(recordParams);
  return recordId; // 저장된 문서의 ID 반환
}
