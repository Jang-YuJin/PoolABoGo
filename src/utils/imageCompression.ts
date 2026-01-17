import imageCompression, { type Options } from 'browser-image-compression';

// 이미지 압축 (파일과 옵션을 받아서 압축)
export async function compressImage(file: File, options: Options): Promise<File> {
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    throw new Error(`이미지 압축 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

// 이미지 파일 여부 확인
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/'); // 이미지 파일 여부
}
