import type { PlantStatusType } from "./common";

export interface AnalysisRecord {
    plantName: string;
    plantDesc: string;
    plantStatus: PlantStatusType;
    plantCaution: string;
};
