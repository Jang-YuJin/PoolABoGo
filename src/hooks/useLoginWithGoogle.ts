import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../services/authService";
import { useQueryClient } from "@tanstack/react-query";

export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkedPlants"] });
    },
    onError: (err: unknown) => {
      const authError = err as { code?: string };
      if (authError?.code === "auth/popup-closed-by-user") {
        throw new Error("로그인 창이 닫혔습니다.");
      }
      throw new Error("로그인에 실패했습니다.");
    },
  });
};
