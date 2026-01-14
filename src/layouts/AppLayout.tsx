import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { styled } from "@mui/material";

const AppLayout = () => {
  return (
    <div>
      {/* 헤더 */}
      <Header />
      <MainContainer>
        <ContentContainer>
          {/* outlet */}
          <Outlet></Outlet>
        </ContentContainer>
      </MainContainer>
      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default AppLayout;

// 스타일드컴포넌트
const MainContainer = styled("main")(() => ({
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 200px)",
}));

const ContentContainer = styled("div")(({ theme }) => ({
  maxWidth: "1280px",
  width: "90%",
  padding: "160px 5%",
  margin: "0 auto",

  [theme.breakpoints.down("md")]: {
    padding: "120px 5%",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "60px 5%",
  },
}));
