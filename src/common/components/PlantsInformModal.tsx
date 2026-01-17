import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Box, IconButton, Modal, Typography, styled, Divider, Skeleton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import EditFields, { SkeletonField } from "./EditFields";
import type { PlantRecord } from "../../models/record";
import { useDeletePlantRecord } from "../../hooks/useDeletePlantRecord";
import { useAuthUser } from "../../hooks/useAuthUser";

type PlantsInformModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  record: PlantRecord;
  isLoading?: boolean;
};

const PlantsInformModal = ({
  open,
  setOpen,
  record,
  isLoading = false,
}: PlantsInformModalProps) => {
  // 닫기 로직은 모달 내부
  const handleClose = () => setOpen(false);

  // 점세개 메뉴 오픈 여부
  const [menuOpen, setMenuOpen] = useState(false);

  // 입력 값 상태
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [caution, setCaution] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(record.plantName ?? "");
    setDesc(record.plantDesc ?? "");
    setStatus(record.plantStatus ?? "");
    setCaution(record.plantCaution ?? "");
  }, [open, record]);

  // 모달 열기 핸들러
  const handleToggleMenu = () => setMenuOpen((v) => !v);

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setMenuOpen(false);
    handleClose();
  };

  // 삭제
  const { user } = useAuthUser();
  const userId = user!.uid;

  const { mutate: deleteRecord, isPending: isDeleting } = useDeletePlantRecord(userId);

  const handleDelete = () => {
    if (!record.id) return;

    deleteRecord(
      {
        recordId: record.id,
        plantImgUrl: record.plantImg,
        thumbnailImgUrl: record.thumbnailImg,
      },
      {
        onSuccess: () => {
          alert("삭제 되었습니다.");
          setMenuOpen(false);
          handleClose();
        },
        onError: () => {
          setMenuOpen(false);
        },
      }
    );
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
                  <ActionItem data-danger onClick={handleDelete} disabled={isDeleting}>
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
            <Title>{record.plantName}</Title>

            {/* 이미지 */}
            {isLoading ? (
              <SkeletonImageCard variant="rectangular" />
            ) : (
              <ImageCard>
                <img src={record.plantImg} alt={name || record.plantName} />
              </ImageCard>
            )}

            {/* 필드 */}
            <Form>
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

const SkeletonImageCard = styled(Skeleton)(() => ({
  width: "100%",
  height: "auto",
  borderRadius: 20,
  overflow: "hidden",
  aspectRatio: "4/3",
}));

const Form = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,

  marginTop: "30px",
}));
