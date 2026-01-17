import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      // 로그아웃 시 모든 사용자 관련 캐시 제거
      queryClient.removeQueries({ queryKey: ["auth", "profile"] });
      queryClient.removeQueries({ queryKey: ["bookmarkedPlants"] });
      queryClient.removeQueries({ queryKey: ["plantRecords"] }); // 모든 userId에 대한 plantRecords 캐시 제거
      queryClient.removeQueries({ queryKey: ["get-ai-response"] }); // AI 응답 캐시도 제거
    },
    onError: () => {
      throw new Error("로그아웃에 실패했습니다.");
    },
  });
};
