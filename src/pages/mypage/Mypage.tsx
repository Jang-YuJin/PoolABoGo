import React from "react";
import { styled, Typography } from "@mui/material";
import PlantsCard from "../../common/components/PlantsCard";

const MyPage = () => {
  return (
    <div>
      <Typography variant="h1">나의 반려식물 둘러보기</Typography>

      <CardWrap>
        <PlantsCard />
        <PlantsCard />
        <PlantsCard />
        <PlantsCard />
        <PlantsCard />
        <PlantsCard />
        <PlantsCard />
        <PlantsCard />
        <PlantsCard />
      </CardWrap>
    </div>
  );
};

export default MyPage;

const CardWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",

  marginTop: "40",

  [theme.breakpoints.down("md")]: {
    gap: "15px",
  },

  [theme.breakpoints.down("sm")]: {
    gap: "15px",
  },
}));
