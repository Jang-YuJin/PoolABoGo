import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Skeleton, styled } from "@mui/material";
import PlantsInformModal from "./PlantsInformModal";
import type { PlantRecord } from "../../models/plantRecord";

// 기본 카드 컴포넌트
type PlantsCardProps = { record: PlantRecord };

const PlantsCard = ({ record }: PlantsCardProps) => {
  // 카드 클릭시 모달 오픈
  const [open, setOpen] = useState(false);

  return (
    <>
      <PlantsCardWrap>
        <PlantsImageWrap>
          <img src={record.thumbnailImg} alt={record.plantName} />
          {record.isBookmarked && (
            <BookmarkBadge className="bookmark-badge">
              <BookmarkIcon />
            </BookmarkBadge>
          )}
        </PlantsImageWrap>
        <ShowIcon>
          <SearchIcon onClick={() => setOpen(true)} />
        </ShowIcon>
      </PlantsCardWrap>

      <PlantsInformModal open={open} setOpen={setOpen} record={record} />
    </>
  );
};

export default PlantsCard;

const PlantsCardWrap = styled("dl")(({ theme }) => ({
  width: "calc((100% - 40px) / 3)",
  height: "auto",
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

    "& .bookmark-badge": {
      opacity: 0,
      pointerEvents: "none",
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

const BookmarkBadge = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "12px",
  right: "12px",
  zIndex: 2,
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  opacity: 1,
  transition: "opacity 0.3s ease",
  pointerEvents: "auto",

  "& svg": {
    width: "20px",
    height: "20px",
    fill: theme.palette.background.paper,
  },

  [theme.breakpoints.down("sm")]: {
    width: "28px",
    height: "28px",
    top: "8px",
    right: "8px",

    "& svg": {
      width: "18px",
      height: "18px",
    },
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

export const SkeletonPlantsCard = styled(Skeleton)(({ theme }) => ({
  width: "calc((100% - 40px) / 3)",
  height: "auto",
  aspectRatio: "1/1",

  borderRadius: "20px",

  [theme.breakpoints.down("md")]: {
    width: "calc((100% - 30px) / 3)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "calc((100% - 15px) / 2)",
  },
}));
