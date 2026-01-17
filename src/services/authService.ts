import { signInWithPopup, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

export const loginWithGoogle = async (): Promise<void> => {
    await signInWithPopup(auth, googleProvider);
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

// 문제 원인:
// getUserProfile이 auth.currentUser를 즉시 반환
// 백그라운드 복귀 시 Firebase 인증 상태 복원 전에 null이 될 수 있음
// onAuthStateChanged 리스너를 사용하지 않아 실시간 상태 변경을 감지하지 못함
// React Query 설정 부족
// 백그라운드 복귀 시 자동 refetch 설정이 명시되지 않음
//
// 해결 방법:
// onAuthStateChanged를 사용하여 인증 상태가 준비될 때까지 기다립니다.
// React Query 설정을 추가하여 백그라운드 복귀 시 자동 refetch 설정을 추가합니다.
export const getUserProfile = async (): Promise<User | null> => {
    // auth.currentUser는 Firebase가 인증 상태를 복원하기 전에 null일 수 있습니다.
    // onAuthStateChanged를 사용하여 인증 상태가 준비될 때까지 기다립니다.
    return new Promise((resolve) => {
        // 이미 인증 상태가 준비되어 있다면 즉시 반환
        if (auth.currentUser) {
            resolve(auth.currentUser);
            return;
        }

        // 인증 상태 변경을 기다림 (첫 번째 이벤트만 처리)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
};
