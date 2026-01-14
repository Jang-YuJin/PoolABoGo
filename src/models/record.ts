import type { STATUS } from "./ai";

export interface RecordSaveObject {
    userId: string;
    plantName: string;
    plantDesc: string;
    plantStatus: STATUS;
    plantCaution: string;
    plantImg: string;
    thumbImgUrl: string;
    createDt: string;
    createId: string;
    updateDt: string;
    updateId: string;
    delYn: string;
};

export interface RecordGetObject {
    userId: string;
    plantName: string;
    plantDesc: string;
    plantStatus: STATUS;
    plantCaution: string;
    plantImg: string;
    thumbImgUrl: string;
    createDt: string;
};