import { styled, Typography } from "@mui/material";
import PlantsCard, { SkeletonPlantsCard } from "../../common/components/PlantsCard";

// 마이페이지
// 로그인한 유저만 접근 가능, 로그인 안 되어 있으면 로그인으로 리다이렉션
// 저장된 나의 반려식물 카드 보임-> 무한스크롤구현
// 카드는 pc : 3 / tablet : 2 / mo : 1 씩 보임
const MyPage = () => {
  const isPlantsLoading = true;

  return (
    <div>
      <Typography variant="h1">나의 반려식물 둘러보기</Typography>

      <CardWrap>
        {isPlantsLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonPlantsCard key={index} variant="rectangular" />
            ))}
          </>
        ) : (
          <>
            <PlantsCard />
            <PlantsCard />
            <PlantsCard />
            <PlantsCard />
            <PlantsCard />
          </>
        )}
      </CardWrap>
    </div>
  );
};

export default MyPage;

const CardWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",

  marginTop: "40px",

  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    gap: "15px",
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
    gap: "12px",
  },
}));
