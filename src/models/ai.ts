export interface AiResponse {
    plantName: string;
    plantDesc: string;
    plantStatus: STATUS;
    plantCaution: string;
};

const STATUS = {
  GOOD: 1,
  NORMAL: 2,
  BAD: 3,
} as const;

export type STATUS = typeof STATUS[keyof typeof STATUS];
