import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { compressImage, isImageFile } from '../utils/imageCompression';
import { ORIGINAL_COMPRESSION_OPTIONS, THUMBNAIL_COMPRESSION_OPTIONS } from '../configs/imageCompressionConfig';
import { uploadOriginalImage, uploadThumbnail } from './storageService';
import { COLLECTION_NAME } from "../configs/collection";
import type { CreatePlantRecordParams, GetPlantRecordsParams, GetPlantRecordsResponse, PlantRecord } from "../models/plantRecord";

// 식물 기록 저장 함수
export async function createPlantRecord(params: CreatePlantRecordParams): Promise<string> {
    // 이미지 파일 여부 확인
    if (!isImageFile(params.imageFile)) {
        throw new Error('이미지 파일이 아닙니다.');
    }

    // 문서 아이디 먼저 생성함
    const docRef = doc(collection(db, COLLECTION_NAME.PLANT_RECORDS));
    const plantId = docRef.id;

    // 이미지 압축 및 storage에 업로드
    const compressedImage = await compressImage(params.imageFile, ORIGINAL_COMPRESSION_OPTIONS);
    const thumbnailImage = await compressImage(params.imageFile, THUMBNAIL_COMPRESSION_OPTIONS);
    const [plantImg, thumbnailImg] = await Promise.all([
        uploadOriginalImage(compressedImage, params.userId, plantId),
        uploadThumbnail(thumbnailImage, params.userId, plantId)
    ]);

    // DB에 식물 기록 저장
    try {
        const now = Timestamp.now();
        const recordData: PlantRecord = {
            id: plantId,
            userId: params.userId,
            plantName: params.plantName,
            plantDesc: params.plantDesc,
            plantStatus: params.plantStatus,
            plantCaution: params.plantCaution,
            plantImg: plantImg,
            thumbnailImg: thumbnailImg,
            isBookmarked: false,
            recordStatus: true,
            createDt: now,
            createId: params.userId,
            updateDt: now,
            updateId: params.userId
        };
        await setDoc(docRef, recordData);
        return plantId;
    } catch (error) {
        throw new Error(`기록 저장 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
}

// 유저의 저장된 식물 데이터 가져오기
export const getPlantRecords = async (params: GetPlantRecordsParams): Promise<GetPlantRecordsResponse> => {
    const { userId, pageSize, lastDoc = null } = params;
    const base = query(
        collection(db, COLLECTION_NAME.PLANT_RECORDS),
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

// 유저의 식물기록 삭제
export const deletePlantRecord = async (recordId: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME.PLANT_RECORDS, recordId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await updateDoc(docRef, {
            recordStatus: false,
            updateDt: Timestamp.now()
        });
    } else {
        throw new Error("해당 문서를 찾을 수 없습니다.");
    }
};
