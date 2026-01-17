// 유저의 식물 데이터 삭제하기
// hooks/useDeletePlantRecord.ts
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { PlantRecord } from "../models/record";
import deleteUserPlantsRecords from "../services/deleteUserPlantsRecords";

type DeleteVars = {
  recordId: string;
  plantImgUrl?: string | null;
  thumbnailImgUrl?: string | null;
};

export function useDeletePlantRecord(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: DeleteVars) => deleteUserPlantsRecords(vars),

    onSuccess: (_data, vars) => {
      const { recordId } = vars;

      queryClient.setQueryData(["plantRecords", userId], (old: InfiniteData<any> | undefined) => {
        if (!old) return old;

        const nextPages = old.pages.map((page: any) => ({
          ...page,
          items: (page.items as PlantRecord[]).filter((r) => r.id !== recordId),
        }));

        return { ...old, pages: nextPages };
      });
    },
  });
}
