import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { AiResponse } from "../models/ai";
import getPlantInfo from "../apis/geminiAiApi/geminiAiApi";

const useGetAiResponse = (img?: File): UseQueryResult<AiResponse, Error> => {
    return useQuery({
        queryKey: ['get-ai-response', img],
        queryFn: () => {
            if(!img){
                throw new Error('No Image!');
            }

            return getPlantInfo(img);
        },
        enabled: false
    });
};

export default useGetAiResponse;