import imageCompression, { type Options } from 'browser-image-compression';

// 원본 이미지 압축 옵션
const ORIGINAL_COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 2, // 최대 파일 용량
  maxWidthOrHeight: 1920, // 최대 너비 or 높이
  useWebWorker: true, // 웹 워커 사용 여부
  fileType: 'image/jpeg', // 파일 형식
  initialQuality: 0.8 // 초기 품질
};

// 썸네일 이미지 압축 옵션
const THUMBNAIL_COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 0.5, // 최대 파일 용량
  maxWidthOrHeight: 400, // 최대 너비 or 높이
  useWebWorker: true, // 웹 워커 사용 여부
  fileType: 'image/jpeg', // 파일 형식
  initialQuality: 0.6 // 초기 품질
};

// 원본 이미지 압축 (parm : file)
export async function compressImage(file: File): Promise<File> {
  try {
    const compressedFile = await imageCompression(file, ORIGINAL_COMPRESSION_OPTIONS);
    return compressedFile; // 압축된 이미지
  } catch (error) {
    throw new Error(`이미지 압축 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

// 썸네일 이미지 압축 (parm : file)
export async function generateThumbnail(file: File): Promise<File> {
  try {
    const thumbnailFile = await imageCompression(file, THUMBNAIL_COMPRESSION_OPTIONS);
    return thumbnailFile; // 압축된 썸네일 이미지
  } catch (error) {
    throw new Error(`썸네일 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

// 이미지 파일 여부 확인 (parm : file)
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/'); // 이미지 파일 여부
}
