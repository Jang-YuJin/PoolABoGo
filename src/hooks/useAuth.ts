import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import { type AsyncState, Status, loading, success, error, idle } from '../utils/result';

export const useAuth = () => {
    const [authState, setAuthState] = useState<AsyncState<User | null>>(loading());
    const [actionState, setActionState] = useState<AsyncState<void>>(idle());

    // 로그인 유무 확인
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthState(success(currentUser));
        });

        return () => unsubscribe();
    }, []);

    // 구글 로그인 및 회원가입
    // 가입되지 않은 경우 자동으로 회원가입까지 처리됨
    const loginWithGoogle = async (): Promise<void> => {
        setActionState(loading());
        try {
            await signInWithPopup(auth, googleProvider);
            setActionState(success());
        } catch (err: any) {
            const message = err.code === 'auth/popup-closed-by-user' 
                ? "로그인 창이 닫혔습니다." 
                : "로그인에 실패했습니다.";
            setActionState(error(message));
        }
    };

    // 로그아웃
    const logout = async (): Promise<void> => {
        setActionState(loading());
        try {
            await signOut(auth);
            setActionState(success());
        } catch (err) {
            const message = "로그아웃에 실패했습니다."
            setActionState(error(message));
        }
    };

    return {
        user: authState.status === Status.SUCCESS ? authState.data : null,
        isLoggedIn: !!(authState.status === Status.SUCCESS && authState.data),
        authState,
        actionState,
        loginWithGoogle,
        logout
    };
};
