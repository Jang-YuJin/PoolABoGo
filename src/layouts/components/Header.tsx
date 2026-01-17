import { useState, type MouseEvent } from "react";
import { Button, Avatar, Menu, MenuItem, Divider, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useLogout } from "../../hooks/useLogout";
import { useLoginWithGoogle } from "../../hooks/useLoginWithGoogle";

// 풀어보고 로고 이미지
import logo from "/logo.png";

// 페이지 상단 헤더 컴포넌트
const Header = () => {
  const navigate = useNavigate();

  const { data: user, isLoading: isUserLoading } = useGetUserProfile();
  const { mutate: loginWithGoogle } = useLoginWithGoogle();
  const { mutate: logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 아바타 클릭시 메뉴 열기
  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  // 메뉴 닫기
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // 마이페이지 이동
  const handleGoMyPage = () => {
    handleCloseMenu();
    navigate("/mypage");
  };

  // 로그인
  const handleLogin = () => {
    loginWithGoogle();
    handleCloseMenu();
    navigate("/");
  };

  // 로그아웃
  const handleLogout = () => {
    handleCloseMenu();
    logout(undefined, {
      onSuccess: () => {
        // 로그아웃 성공 시 페이지 완전 리로딩
        window.location.href = "/";
      },
    });
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        {/* 로고 */}
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>

        {/* 로그인 */}
        {isUserLoading ? (
          <AvatarSkeleton variant="circular" />
        ) : !user ? (
          <Button variant="outlined" onClick={handleLogin}>
            로그인
          </Button>
        ) : (
          <>
            {/* 아바타 버튼 */}
            <AvatarButton
              onClick={handleOpenMenu}
              aria-controls={open ? "avatar-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={user?.photoURL ?? ""} alt={user?.displayName ?? ""} />
            </AvatarButton>

            {/* 아바타 아래 메뉴 */}
            <Menu
              id="avatar-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleGoMyPage}>마이페이지</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </Menu>
          </>
        )}
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;

// 스타일드 컴포넌트
const HeaderContainer = styled("header")(({ theme }) => ({
  width: "100%",
  height: "100px",
  background: theme.palette.background.paper,
  padding: "0 5%",

  [theme.breakpoints.down("md")]: {
    height: "90px",
  },

  [theme.breakpoints.down("sm")]: {
    height: "80px",
  },
}));

const HeaderInner = styled("div")(({ theme }) => ({
  maxWidth: "1280px",
  width: "100%",
  padding: "20px 0",
  height: "100%",
  margin: "0 auto",
  boxSizing: "border-box",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "& img": {
    width: "160px",
    height: "auto",
    objectFit: "cover",
  },

  [theme.breakpoints.down("md")]: {
    padding: "16px 0",
    "& img": {
      width: "146px",
    },
  },

  [theme.breakpoints.down("sm")]: {
    padding: "14px 0",
    "& img": {
      width: "128px",
    },
  },
}));

const AvatarButton = styled("button")(() => ({
  border: "none",
  background: "transparent",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",

  fontSize: "1rem !important",
}));

const AvatarSkeleton = styled(Skeleton)(() => ({
  width: 40,
  height: 40,
}));
