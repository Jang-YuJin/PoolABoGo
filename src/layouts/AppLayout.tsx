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
const MainContainer = styled("main")(({ theme }) => ({
  width: "90%",
  height: "100%",
  minHeight: "calc(100vh - 200px)",
  margin: "0 auto",
  maxWidth: "1280px",

  [theme.breakpoints.down("md")]: {
    minHeight: "calc(100vh - 180px)",
  },

  [theme.breakpoints.down("sm")]: {
    minHeight: "calc(100vh - 160px)",
  },
}));

const ContentContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "160px 0",
  margin: "0 auto",

  [theme.breakpoints.down("md")]: {
    padding: "120px 0",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "60px 0",
  },
}));
