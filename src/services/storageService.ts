import { ref, uploadBytes, getDownloadURL, type UploadResult } from 'firebase/storage';
import { storage } from '../utils/firebase';

// 원본 이미지 업로드
export async function uploadOriginalImage(
    file: File,
    userId: string,
    plantId: string
): Promise<string> {
    try {
        const storageRef = ref(storage, `users/${userId}/plants/${plantId}/original.jpg`); // 원본 이미지 업로드 경로
        const snapshot: UploadResult = await uploadBytes(storageRef, file); // 원본 이미지 업로드
        const downloadURL = await getDownloadURL(snapshot.ref); // 원본 이미지 다운로드 URL 획득
        return downloadURL; // 원본 이미지 다운로드 URL 반환
    } catch (error) {
        throw new Error(`이미지 업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
}

// 썸네일 이미지 업로드
export async function uploadThumbnail(
    file: File,
    userId: string,
    plantId: string
): Promise<string> {
    try {
        const storageRef = ref(storage, `users/${userId}/plants/${plantId}/thumbnail.jpg`); // 썸네일 이미지 업로드 경로
        const snapshot: UploadResult = await uploadBytes(storageRef, file); // 썸네일 이미지 업로드
        const downloadURL = await getDownloadURL(snapshot.ref); // 썸네일 이미지 다운로드 URL 획득
        return downloadURL; // 썸네일 이미지 다운로드 URL 반환
    } catch (error) {
        throw new Error(`썸네일 업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
}
