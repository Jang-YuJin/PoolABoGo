import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

// 버튼
interface PrimaryButtonProps {
  label: string; // 텍스트
  to?: string; //  연결 링크, 선택적 사용
  onClick?: () => void; // 액션, 선택적 사용
  disabled?: boolean;
}

const PrimaryButton = ({ label, to, onClick, disabled }: PrimaryButtonProps) => {
  // 네비게이션
  const navigate = useNavigate();

  const handleClick = () => {
    // 단순한 이동인 경우(ex 기록페이지 이동 등)
    if (to) navigate(to);

    // 이동이 아닌 액션이 발생하는 경우(ex 저장 등)
    onClick?.();
  };

  return (
    <StyledButton onClick={handleClick} disabled={disabled} variant="contained">
      {label}
    </StyledButton>
  );
};

export default PrimaryButton;

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.paper,
  height: 56,
  padding: "0 32px",
  borderRadius: 9999,
  fontSize: 16,
  fontWeight: 600,
  border: "1px solid transparent",
  boxShadow: "none",
  transition: "all .3s ease",
  textTransform: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #2aae47",
    color: theme.palette.primary.main,
  },
  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));
