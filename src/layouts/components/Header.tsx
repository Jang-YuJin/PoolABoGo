import React, { useState, type MouseEvent } from "react";
import { Button, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";

// 사용자 타입
type User = {
  name: string;
  avatarUrl?: string;
  // 추가
};

// 페이지 상단 헤더 컴포넌트
const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

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

  // 로그아웃
  const handleLogout = () => {
    handleCloseMenu();
    setUser(null);
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        {/* 로고 */}
        <Link to="/">
          <img src="/src/assets/logo.png" alt="로고" />
        </Link>

        {/* 로그인 */}
        {!user ? (
          <Button variant="outlined" component={RouterLink} to="/login">
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
              <Avatar src={user.avatarUrl} alt={user.name} />
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
}));

const HeaderInner = styled("div")(() => ({
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
