import { type Options } from 'browser-image-compression';

// 원본 이미지 압축 옵션
export const ORIGINAL_COMPRESSION_OPTIONS: Options = {
    maxSizeMB: 2, // 최대 파일 용량
    maxWidthOrHeight: 1920, // 최대 너비 or 높이
    useWebWorker: true, // 웹 워커 사용 여부
    fileType: 'image/jpeg', // 파일 형식
    initialQuality: 0.8 // 초기 품질
};

// 썸네일 이미지 압축 옵션
export const THUMBNAIL_COMPRESSION_OPTIONS: Options = {
    maxSizeMB: 0.5, // 최대 파일 용량
    maxWidthOrHeight: 400, // 최대 너비 or 높이
    useWebWorker: true, // 웹 워커 사용 여부
    fileType: 'image/jpeg', // 파일 형식
    initialQuality: 0.6 // 초기 품질
};
