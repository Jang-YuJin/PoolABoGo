import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const AppLayout = React.lazy(() => import("./layouts/AppLayout"));
const MainPage = React.lazy(() => import("./pages/main/MainPage"));
const RecordPage = React.lazy(() => import("./pages/record/RecordPage"));
const MyPage = React.lazy(() => import("./pages/record/RecordPage"));

// 메인 '/'
// 기록 '/record'
// 마이페이지 '/maypage'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<AppLayout></AppLayout>}>
          <Route index element={<MainPage></MainPage>}></Route>
          <Route path="/record" element={<RecordPage></RecordPage>}></Route>
          <Route path="/mypage" element={<MyPage></MyPage>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
