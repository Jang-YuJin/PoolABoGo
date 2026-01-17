import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { AnalysisRecord } from "../models/analysisRecord";
import { analyzePlantImage } from "../services/analysisService";

const useAnalyzePlantImage = (img?: File): UseQueryResult<AnalysisRecord, Error> => {
    return useQuery({
        queryKey: ['get-ai-response', img],
        queryFn: () => {
            if(!img){
                throw new Error('No Image!');
            }

            return analyzePlantImage(img);
        },
        enabled: false
    });
};

export default useAnalyzePlantImage;