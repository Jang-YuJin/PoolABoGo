// 유저의 식물 데이터 삭제하기
// hooks/useDeletePlantRecord.ts
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { PlantRecord } from "../models/plantRecord";
import { deletePlantRecord } from "../services/plantRecordService";

export function useDeletePlantRecord(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recordId: string) => deletePlantRecord(recordId),

    onSuccess: (_data, recordId) => {

      queryClient.setQueryData(["plantRecords", userId], (old: InfiniteData<any> | undefined) => {
        if (!old) return old;

        const nextPages = old.pages.map((page: any) => ({
          ...page,
          items: (page.items as PlantRecord[]).filter((r) => r.id !== recordId),
        }));

        return { ...old, pages: nextPages };
      });
      queryClient.invalidateQueries({queryKey: ['plantRecords']});
    },
  });
}
