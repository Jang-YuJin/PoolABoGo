/**
 * RESULT PATTERN
 * IDLE, LOADING, SUCCESS, ERROR 상태를 통해 비동기 작업의 결과를 명시적으로 표현함
 * 현재 firebase를 쓰면서 react-query 처럼 사용하면 좋을 것 같음
 */
export const Status = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
} as const;

export type AsyncState<T> =
    { status: typeof Status.IDLE }
    | { status: typeof Status.LOADING }
    | { status: typeof Status.SUCCESS; data: T }
    | { status: typeof Status.ERROR; error: Error };

/**
 * IDLE, LOADING 상태는 데이터를 가지지 않으므로 AsyncState<never>로 반환
 * 예시: idle() 반환값에서 data에 접근하려 하면 컴파일 타임에 에러 발생 -> 타입 안전성 확보
 */
export const idle = (): AsyncState<never> => ({ status: Status.IDLE });
export const loading = (): AsyncState<never> => ({ status: Status.LOADING });

// 오버로딩 한 이유: 데이터 타입 유무 상관 없이 자동 완성하려고 함
export function success(): AsyncState<void>;
export function success<T>(data: T): AsyncState<T>;
export function success<T>(data?: T): AsyncState<T> {
    return { status: Status.SUCCESS, data: data as T };
}

/**
 * ERROR 상태도 데이터를 가지지 않으므로 AsyncState<never>로 반환
 * 에러 정보는 별도의 error에 저장되며, data 속성은 존재하지 않음
 */
export const error = (err: unknown): AsyncState<never> => ({
    status: Status.ERROR,
    error: err instanceof Error ? err : new Error(String(err)),
});