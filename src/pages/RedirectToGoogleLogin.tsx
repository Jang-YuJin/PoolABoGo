import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";

type LocationState = { from?: string };

// 구글로그인 리다이렉트

const RedirectToGoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useAuthUser();
  const { mutate: loginWithGoogle, isPending } = useLoginWithGoogle();

  const from = useMemo(() => {
    const state = location.state as LocationState | null;
    return state?.from ?? "/";
  }, [location.state]);

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [loading, user, from, navigate]);

  useEffect(() => {
    if (loading) return;
    if (user) return;

    loginWithGoogle(undefined, {
      onSuccess: () => {},
      onError: () => {
        navigate("/", { replace: true });
      },
    });
  }, [loading, user, loginWithGoogle, navigate]);

  return isPending ? null : null;
};

export default RedirectToGoogleLogin;
