import { Box, styled, Typography } from "@mui/material";
import React, { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

type PlantsImageUploaderProps = {
  onChangeFile: (file: File) => void; // 여기서는 필수로 두는 게 안전
};

// 삭물 사진을 추가하여 분석하는 컴포넌트
const PlantsImageUploader = ({ onChangeFile }: PlantsImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) return;

    onChangeFile(selected);

    // 같은 파일을 다시 선택해도 change가 발생하도록 값 초기화
    e.target.value = "";
  };

  return (
    <Wrapper>
      <Typography variant="h1">반려식물 기록하기</Typography>
      <Typography variant="subtitle1">나의 식물이 어떤 상태인지 같이 알아볼까요?</Typography>

      <PreviewWrap>
        <HiddenInput ref={inputRef} type="file" accept="image/*" onChange={handleChange} />

        <AddButton type="button" onClick={openPicker} aria-label="사진 추가">
          <PlusCircle />
        </AddButton>
      </PreviewWrap>
    </Wrapper>
  );
};

export default PlantsImageUploader;

const Wrapper = styled(Box)(() => ({
  maxWidth: "620px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
}));

const PreviewWrap = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 320px)",
  background: theme.palette.background.paper,

  borderRadius: "20px",
  position: "relative",
  overflow: "hidden",

  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    minHeight: "calc(100vh - 240px)",
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
    minHeight: "calc(90vh - 120px)",
  },
}));

const HiddenInput = styled("input")(() => ({
  display: "none",
}));

const AddButton = styled("button")(() => ({
  width: "100%",
  height: "100%",
  border: "none",
  background: "transparent",
  cursor: "pointer",

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const PlusCircle = styled(AddIcon)(({ theme }) => ({
  width: 58,
  height: 58,
  borderRadius: 100,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.background.paper,
  border: `2px solid ${theme.palette.text.primary}`,
  transition: "all .3s ease",

  [theme.breakpoints.down("md")]: {
    width: 52,
    height: 52,
  },

  [theme.breakpoints.down("sm")]: {
    width: 46,
    height: 46,
  },

  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`,
  },

  "& path": {
    transition: "all .3s ease",
    fill: theme.palette.text.primary,
  },

  "&:hover path": {
    fill: theme.palette.primary.main,
  },
}));
