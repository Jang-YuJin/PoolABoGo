import { useEffect, useState } from "react";
import { Box, Skeleton, styled, Typography } from "@mui/material";
import EditFields, { SkeletonField } from "../../../common/components/EditFields";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { useNavigate } from "react-router-dom";

type ShowPlantsInformResultProps = {
  imageFile: File;
};

// 분석이 완료된 식물사진에 대한 결과를 보여주는 컴포넌트
const ShowPlantsInformResult = ({ imageFile }: ShowPlantsInformResultProps) => {
  const navigate = useNavigate();

  // 입력 값 상태 (더미값)
  const [name] = useState("");
  const [desc] = useState("");
  const [status] = useState("");
  const [caution] = useState("");

  const isLoading = true;

  // 이미지 파일 가져오기
  const [plantsImageUrl, setPlantsImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setPlantsImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const saveData = () => {
    // 데이터 저장 로직

    // 메인으로 이동
    navigate("/");
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
        <PrimaryButton label="기록 저장하기" onClick={saveData} />
        <Typography variant="subtitle1">
          로그인 후 기록을 저장하여 내 반려식물을 확인해보세요!
        </Typography>
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
    height: "auto",
    objectFit: "cover",
  },
}));

const SkeletonImgBox = styled(Skeleton)(() => ({
  width: "100%",
  height: "auto",
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
