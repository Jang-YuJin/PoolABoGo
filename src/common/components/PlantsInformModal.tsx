import React, { useState } from "react";
import { Box, IconButton, Modal, Typography, styled, Divider } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import EditFields from "./EditFields";

type PlantsInformModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlantsInformModal = ({ open, setOpen }: PlantsInformModalProps) => {
  // 닫기 로직은 모달 내부
  const handleClose = () => setOpen(false);

  // 점세개 메뉴 오픈 여부
  const [menuOpen, setMenuOpen] = useState(false);

  // 입력 값 상태
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [caution, setCaution] = useState("");

  const handleToggleMenu = () => setMenuOpen((v) => !v);

  const handleDelete = () => {
    setName("");
    setDesc("");
    setStatus("");
    setCaution("");
    setMenuOpen(false);
  };

  const handleModalClose = () => {
    setMenuOpen(false);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Overlay>
        <ModalShell>
          {/* 헤더 */}
          <Header>
            <Left>
              <IconButton size="small" onClick={handleToggleMenu} aria-label="more">
                <MoreVertIcon />
              </IconButton>

              {menuOpen && (
                <ActionMenu>
                  <Divider />
                  <ActionItem data-danger onClick={handleDelete}>
                    삭제
                  </ActionItem>
                </ActionMenu>
              )}
            </Left>

            <IconButton size="small" onClick={handleModalClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Header>

          <Inner>
            {/* 타이틀 */}
            <Title>식물이름</Title>

            {/* 이미지 */}
            <ImageCard>
              <img src="/src/assets/platEx01.png" alt="식물" />
            </ImageCard>

            {/* 필드 */}
            <Form>
              <EditFields label="식물이름" value={name} />

              <EditFields label="설명" value={desc} />

              <EditFields label="상태" value={status} />

              <EditFields label="주의사항" value={caution} />
            </Form>
          </Inner>
        </ModalShell>
      </Overlay>
    </Modal>
  );
};

export default PlantsInformModal;

// 스타일드 컴포넌트
const Overlay = styled(Box)(() => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  boxSizing: "border-box",
}));

const ModalShell = styled(Box)(({ theme }) => ({
  width: "min(560px, 92vw)",
  maxHeight: "min(760px, 92vh)",
  overflow: "auto",
  background: theme.palette.background.paper,
  borderRadius: 20,
  padding: 20,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 20,
}));

const Header = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

const Left = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
}));

const Inner = styled("div")(() => ({
  height: "calc(100vh - 100px)",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },

  /* Firefox */
  scrollbarWidth: "none",

  /* IE (거의 안 쓰지만 완전 대응) */
  msOverflowStyle: "none",
}));

const ActionMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 36,
  left: 0,
  minWidth: 140,
  borderRadius: 12,
  background: theme.palette.background.paper,
  boxShadow: "0 10px 26px rgba(0,0,0,0.14)",
  zIndex: 10,
  overflow: "hidden",
}));

const ActionItem = styled("button")(({ theme }) => ({
  width: "100%",
  textAlign: "left",
  padding: "10px 12px",
  border: 0,
  background: "transparent",
  cursor: "pointer",
  fontSize: 14,

  "&:hover": {
    background: theme.palette.action.hover,
  },

  "&[data-danger='true']": {
    color: theme.palette.error.main,
  },
}));

const Title = styled(Typography)(() => ({
  fontSize: "2rem",
  fontWeight: 700,
  textAlign: "center",
  marginTop: "10px",
}));

const ImageCard = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: 20,
  overflow: "hidden",
  background: theme.palette.divider,
  aspectRatio: "4/3",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
}));

const Form = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,

  marginTop: "30px",
}));
