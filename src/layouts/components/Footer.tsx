import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

// 페이지 하단 푸터 컴포넌트
const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <Typography variant="body1">ⓒ2026 POOLABOGO. All rights reserved </Typography>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;

// 스타일드 컴포넌트
const FooterContainer = styled("footer")(({ theme }) => ({
  width: "100%",
  height: "100px",
  background: theme.palette.background.paper,

  [theme.breakpoints.down("md")]: {
    height: "90px",
  },

  [theme.breakpoints.down("sm")]: {
    height: "80px",
  },
}));

const FooterInner = styled("div")(() => ({
  maxWidth: "1280px",
  width: "90%",
  padding: "0 5%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
}));
