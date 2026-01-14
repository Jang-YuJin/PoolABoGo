import { styled, Typography } from "@mui/material";
import PrimaryButton from "../../common/components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import PlantsCard from "../../common/components/PlantsCard";

// 메인페이지
// 모든 유저 -> 기록하러가기만 보임
// 로그인 후 기록 저장 된 유저 -> 하단 나의 반려식물 카드 보임
const MainPage = () => {
  const Navigate = useNavigate();

  return (
    <ContentsWrap>
      {/* 모든 유저 */}
      <TopContents>
        <Typography variant="h1">식물의 이야기를 남겨볼까요?</Typography>
        <img src="/src/assets/mainImage.png" alt="풀어보고" />
        <PrimaryButton label="기록하러 가기" onClick={() => Navigate("/record")} />
      </TopContents>

      {/* 식물 사진 저장 했을 때 보여짐 */}
      <SwiperContents>
        <Typography variant="h1" fontWeight={700}>
          나의 대표 반려식물
        </Typography>

        <CardWrap>
          <PlantsCard />
          <PlantsCard />
          <PlantsCard />
        </CardWrap>
      </SwiperContents>
    </ContentsWrap>
  );
};

export default MainPage;

// 스타일드 컴포넌트
const ContentsWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& div + div": {
    marginTop: "60px",
  },

  [theme.breakpoints.down("md")]: {
    "& div + div": {
      marginTop: "45px",
    },
  },

  [theme.breakpoints.down("sm")]: {
    "& div + div": {
      marginTop: "30px",
    },
  },
}));

const TopContents = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "60px",

  [theme.breakpoints.down("md")]: {
    gap: "45px",
  },

  [theme.breakpoints.down("sm")]: {
    gap: "30px",
  },

  "& Button": {
    display: "inline-block",
  },
}));

const SwiperContents = styled("div")(({ theme }) => ({
  "& Typography": {
    marginBottom: "40px",

    [theme.breakpoints.down("md")]: {
      marginBottom: "30px",
    },

    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
  },
}));

const CardWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",

  [theme.breakpoints.down("md")]: {
    gap: "15px",
  },

  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));
