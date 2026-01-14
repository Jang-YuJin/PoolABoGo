import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../services/authService";

export const useLoginWithGoogle = () => {
  return useMutation({
    mutationFn: loginWithGoogle,
    onError: (err: unknown) => {
      const authError = err as { code?: string };
      if (authError?.code === "auth/popup-closed-by-user") {
        throw new Error("로그인 창이 닫혔습니다.");
      }
      throw new Error("로그인에 실패했습니다.");
    },
  });
};
