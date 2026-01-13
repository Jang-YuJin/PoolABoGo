import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const AppLayout = React.lazy(() => import("./laylouts/AppLayout"));
const Main = React.lazy(() => import("./pages/main/Main"));
const Record = React.lazy(() => import("./pages/record/Record"));
const Mypage = React.lazy(() => import("./pages/mypage/Mypage"));

// 메인 '/'
// 기록 '/record'
// 마이페이지 '/maypage'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<AppLayout></AppLayout>}>
          <Route index element={<Main></Main>}></Route>
          <Route path="/record" element={<Record></Record>}></Route>
          <Route path="/mypage" element={<Mypage></Mypage>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
