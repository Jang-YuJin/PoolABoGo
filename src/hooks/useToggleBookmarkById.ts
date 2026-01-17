import { useMutation } from "@tanstack/react-query";
import { toggleBookmarkById } from "../services/bookmarkService";
import { useQueryClient } from "@tanstack/react-query";

const useToggleBookmarkById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (docId: string) => toggleBookmarkById(docId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookmarkedPlants"] }); // TODO: 식물 리스트, 단일 쪽도 추가해야 함

        },
    });
};

export default useToggleBookmarkById;
