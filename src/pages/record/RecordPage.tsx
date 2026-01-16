import React, { useState } from "react";
import PlantsImageUploader from "./components/PlantsImageUploader";
import ShowPlantsInformResult from "./components/ShowPlantsInformResult";
import useGetAiResponse from "../../hooks/useGetAiResponse";

// 로그인 여부 상관 없이 접근 가능
// 사진 올리면 -> gemini api 분석 -> 저장
// 저장 할 경우 비로그인 유저는 로그인 유도 후 저장

const RecordPage = () => {
  // 이미지 파일 여부
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const {data, isLoading, refetch} = useGetAiResponse(imageFile);

  return (
    <div>
      {/* 이미지 추가 안했다면 ? PlantsImageUploader : ShowPlantsInformResult */}
      {!imageFile ? (
        <PlantsImageUploader onChangeFile={(file) => setImageFile(file)} />
      ) : (
        <ShowPlantsInformResult imageFile={imageFile} aiResponse={data} refetch={refetch} isLoading={isLoading}/>
      )}
    </div>
  );
};

export default RecordPage;
