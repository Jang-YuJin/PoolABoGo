import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/authService";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: getUserProfile,
    staleTime: 0, // 인증 상태는 항상 최신 상태를 유지해야 함
    refetchOnWindowFocus: true, // 백그라운드에서 돌아올 때 자동 refetch
    refetchOnMount: true, // 컴포넌트 마운트 시 refetch
  });
};
