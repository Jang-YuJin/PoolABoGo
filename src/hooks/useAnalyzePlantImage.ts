import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { AnalysisRecord } from "../models/analysisRecord";
import { analyzePlantImage } from "../services/analysisService";

const useAnalyzePlantImage = (img?: File): UseQueryResult<AnalysisRecord, Error> => {
    return useQuery({
        queryKey: ['get-ai-response', img?.name, img?.lastModified],
        queryFn: () => {
            if(!img) throw new Error('No Image!');
            return analyzePlantImage(img);
        },
        enabled: !!img, // 이미지가 있을 때만 자동으로 API 호출 시작
        staleTime: Infinity, // 한 번 분석한 이미지는 페이지 내에서 다시 분석하지 않도록 보호
    });
};

export default useAnalyzePlantImage;