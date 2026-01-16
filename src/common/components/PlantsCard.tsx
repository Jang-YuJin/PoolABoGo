import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material";
import PlantsInformModal from "./PlantsInformModal";

// 기본 카드 컴포넌트

const PlantsCard = () => {
  // 카드 클릭시 모달 오픈
  const [open, setOpen] = useState(false);

  return (
    <>
      <PlantsCardWrap>
        <PlantsImageWrap>
          <img src="/src/assets/platEx01.png" alt="풀어보고" />
        </PlantsImageWrap>
        <ShowIcon>
          <SearchIcon onClick={() => setOpen(true)} />
        </ShowIcon>
      </PlantsCardWrap>

      <PlantsInformModal open={open} setOpen={setOpen} />
    </>
  );
};

export default PlantsCard;

const PlantsCardWrap = styled("dl")(({ theme }) => ({
  width: "calc((100% - 40px) / 3)",
  position: "relative",
  transition: "all .3s ease",
  borderRadius: "20px",
  overflow: "hidden",

  [theme.breakpoints.down("md")]: {
    width: "calc((100% - 30px) / 3)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "calc((100% - 15px) / 2)",
  },

  "&:hover": {
    cursor: "pointer",

    "& dt:before": {
      display: "flex",
      content: "''",
    },

    "& dd": {
      opacity: 100,
    },
  },
}));

const PlantsImageWrap = styled("dt")(() => ({
  position: "relative",
  overflow: "hidden",

  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    aspectRatio: "1/1",
  },

  "&:before": {
    width: "100%",
    height: "100%",

    background: "#333",
    opacity: "80%",
    top: "0",
    left: "0",
    position: "absolute",
  },
}));

const ShowIcon = styled("dd")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  zIndex: "1",

  width: "55px",
  height: "55px",
  borderRadius: "100%",
  background: theme.palette.primary.main,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 !important",

  opacity: 0,

  transition: "all .3s ease",

  [theme.breakpoints.down("md")]: {
    width: "48px",
    height: "48px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "35px",
    height: "35px",
  },

  "& svg": {
    fill: theme.palette.background.paper,
  },

  "&:hover": {
    background: theme.palette.background.paper,

    "& svg": {
      fill: theme.palette.primary.main,
    },
  },
}));
