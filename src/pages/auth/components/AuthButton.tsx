import { useAuth } from "../../../hooks/useAuth";
import { Status } from "../../../utils/result";

const AuthButton = () => {
    const { user, isLoggedIn, authState, actionState, loginWithGoogle, logout } = useAuth();

    // 인증 상태 확인
    switch (authState.status) {
        case Status.LOADING:
            return <p>로딩 중...</p>;
        case Status.ERROR:
            return <p style={{ color: 'red' }}>인증 확인 실패: {authState.error.message}</p>;
        case Status.SUCCESS:
            break;
    }

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <p>{user?.displayName ?? 'Unknown'}님 환영합니다!</p>
                    <button
                        onClick={logout}
                        disabled={actionState.status === Status.LOADING}
                    >
                        {actionState.status === Status.LOADING ? '처리 중...' : '로그아웃'}
                    </button>
                </>
            ) : (
                <button
                    onClick={loginWithGoogle}
                    disabled={actionState.status === Status.LOADING}
                >
                    {actionState.status === Status.LOADING ? '처리 중...' : '구글로 로그인/회원가입'}
                </button>
            )}

            {actionState.status === Status.ERROR && (
                <p className="error" style={{ color: 'red' }}>{actionState.error.message}</p>
            )}
        </div>
    );
}

export default AuthButton;
