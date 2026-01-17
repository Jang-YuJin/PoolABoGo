import { useMutation } from "@tanstack/react-query";
import type { CreatePlantRecordParams } from "../models/plantRecord";
import { createPlantRecord } from "../services/plantRecordService";
import { useQueryClient } from "@tanstack/react-query";

const useCreatePlantRecord = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreatePlantRecordParams) => createPlantRecord(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["plantRecords"] });
        },
    });
};

export default useCreatePlantRecord;