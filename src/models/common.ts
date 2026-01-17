export const PlantStatus = {
    HEALTHY: 'healthy', // 건강
    WARNING: 'warning', // 주의
    CRITICAL: 'critical', // 위험험
    UNKNOWN: 'unknown' // 알 수 없음
} as const;

export type PlantStatusType = typeof PlantStatus[keyof typeof PlantStatus];
