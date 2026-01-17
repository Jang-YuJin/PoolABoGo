import { useInfiniteQuery } from "@tanstack/react-query";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import getUserPlantsRecords from "../services/getUserPlantsRecords";

const PAGE_SIZE = 9;

// 로그인한 유저의 식물기록저장 가져오는 훅
export const useGetUserPlantsRecords = (userId: string | null | undefined) => {
  return useInfiniteQuery({
    queryKey: ["plantRecords", userId],
    enabled: !!userId, // 아이디 없으면 실행 X
    initialPageParam: null as QueryDocumentSnapshot<DocumentData> | null,
    queryFn: ({ pageParam }) =>
      getUserPlantsRecords({
        userId: userId as string,
        pageSize: PAGE_SIZE,
        lastDoc: pageParam,
      }),

    getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
    select: (data) => ({
      ...data,
      flatItems: data.pages.flatMap((p) => p.items),
    }),
  });
};
