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

// 이미지 파일을 Base64 문자열로 변환 (Gemini API 호출용)
export async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // FileReader 객체 생성
    const reader = new FileReader();
    // FileReader 객체 읽기 완료 이벤트 처리
    reader.onload = () => {
      const result = reader.result; // 읽은 파일 데이터
      if (typeof result === 'string') {
        // data:image/jpeg;base64, 부분을 제거하고 순수 Base64 문자열만 반환
        const base64String = result.split(',')[1];
        resolve(base64String); // Base64 문자열 반환
      } else {
        reject(new Error('Base64 변환 실패'));
      }
    };
    reader.onerror = () => {
      reject(new Error('파일 읽기 실패'));
    };
    reader.readAsDataURL(file); // 파일 읽기
  });
}

// Base64 문자열을 data URL 형식으로 변환 (미리보기 등에 사용)
export function base64ToDataURL(base64: string, mimeType: string = 'image/jpeg'): string {
  return `data:${mimeType};base64,${base64}`;
}