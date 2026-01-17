import { useEffect, useState } from "react";
import { Box, Skeleton, styled, Typography, Alert } from "@mui/material";
import EditFields, { SkeletonField } from "../../../common/components/EditFields";
import PrimaryButton from "../../../common/components/PrimaryButton";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useGetUserProfile } from "../../../hooks/useGetUserProfile";
import useCreatePlantRecord from "../../../hooks/useCreatePlantRecord";
import type { AnalysisRecord } from "../../../models/analysisRecord";

type ShowPlantsInformResultProps = {
  imageFile: File;
  analysisRecord: AnalysisRecord | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AnalysisRecord, Error>>;
  isLoading: boolean;
};

// 분석이 완료된 식물사진에 대한 결과를 보여주는 컴포넌트
const ShowPlantsInformResult = ({
  imageFile,
  analysisRecord,
  refetch,
  isLoading,
}: ShowPlantsInformResultProps) => {
  const { data: user } = useGetUserProfile();
  const { mutate: createPlantRecord } = useCreatePlantRecord();

  // 입력 값 상태 (더미값)
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [caution, setCaution] = useState("");

  // 이미지 파일 가져오기
  const [plantsImageUrl, setPlantsImageUrl] = useState<string | null>(null);
  
  // 저장 상태
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setPlantsImageUrl(url);

    refetch();

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  useEffect(() => {
    if (!analysisRecord) {
      return;
    }

    setName(analysisRecord.plantName);
    setDesc(analysisRecord.plantDesc);
    setStatus(analysisRecord.plantStatus.toString());
    setCaution(analysisRecord.plantCaution);
  }, [analysisRecord]);

  const saveData = async () => {
    if (!user) {
      setSaveError("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    if (!analysisRecord || !imageFile) {
      setSaveError("분석 결과 또는 이미지 파일이 없습니다.");
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      createPlantRecord({
        imageFile,
        userId: user.uid,
        plantName: analysisRecord.plantName,
        plantDesc: analysisRecord.plantDesc,
        plantStatus: analysisRecord.plantStatus.toString(),
        plantCaution: analysisRecord.plantCaution,
      });

      setSaveSuccess(true);

      // TODO: 이건 UX 해침
      // setTimeout(() => {
      //   navigate("/");
      // }, 1500);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Title variant="h1">반려식물 기록하기</Title>

      <Wrapper>
        {/* 왼쪽영역 */}
        {isLoading ? (
          <SkeletonImgBox variant="rectangular" />
        ) : (
          <ImgBox>
            {/* 추가한 이미지가 여기 보여짐 */}
            {plantsImageUrl && <img src={plantsImageUrl} alt="업로드한 식물 이미지" />}
          </ImgBox>
        )}

        {/* 오른쪽 영역 */}
        <ResultBox>
          {isLoading ? (
            <>
              <SkeletonField />
              <SkeletonField />
              <SkeletonField />
              <SkeletonField />
            </>
          ) : (
            <>
              <EditFields label="식물이름" value={name} />
              <EditFields label="설명" value={desc} />
              <EditFields label="상태" value={status} />
              <EditFields label="주의사항" value={caution} />
            </>
          )}
        </ResultBox>
      </Wrapper>

      <ButtonWrap>
        <PrimaryButton 
          label={saving ? "저장 중..." : "기록 저장하기"} 
          onClick={saveData}
          disabled={saving || !user || !analysisRecord}
        />
        {!user && (
          <Typography variant="subtitle1" sx={{ mt: 1, color: 'text.secondary' }}>
            로그인 후 기록을 저장하여 내 반려식물을 확인해보세요!
          </Typography>
        )}
        {saveError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {saveError}
          </Alert>
        )}
        {saveSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            기록이 성공적으로 저장되었습니다!
          </Alert>
        )}
      </ButtonWrap>
    </div>
  );
};

export default ShowPlantsInformResult;

const Title = styled(Typography)(() => ({
  textAlign: "center",
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  marginTop: "40px",

  [theme.breakpoints.down("md")]: {
    gap: "30px",
    marginTop: "30px",
  },

  [theme.breakpoints.down("sm")]: {
    gap: "20px",
    marginTop: "20px",
    flexDirection: "column",
  },

  "& div": {
    background: theme.palette.background.paper,
    width: "calc((100% - 40px) /2)",
    borderRadius: "20px",
    overflow: "hidden",

    [theme.breakpoints.down("md")]: {
      width: "calc((100% - 30px) /2)",
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const ImgBox = styled(Box)(() => ({
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    aspectRatio: "1/1",
  },
}));

const SkeletonImgBox = styled(Skeleton)(() => ({
  width: "100%",
  height: "auto",
  borderRadius: "20px",
  objectFit: "cover",
}));

const ResultBox = styled(Box)(({ theme }) => ({
  padding: "10px",
  boxSizing: "border-box",

  display: "flex",
  flexDirection: "column",
  gap: "40px",

  [theme.breakpoints.down("md")]: {
    gap: "30px",
  },

  [theme.breakpoints.down("sm")]: {
    gap: "20px",
  },

  "& div": {
    width: "100% !important",

    "&:last-of-type": {
      "& p:last-of-type": {
        display: "block",
        minHeight: "180px",
        overflowY: "hidden",

        "&::-webkit-scrollbar": {
          display: "none",
        },

        /* Firefox */
        scrollbarWidth: "none",

        /* IE (거의 안 쓰지만 완전 대응) */
        msOverflowStyle: "none",
      },
    },
  },
}));

const ButtonWrap = styled("div")(({ theme }) => ({
  margin: "0 auto",
  textAlign: "center",
  marginTop: "40px",

  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
  },
}));
