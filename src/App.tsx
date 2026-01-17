import React, { Suspense } from "react";
import "./App.css";
import RedirectToGoogleLogin from "./common/pages/RedirectToGoogleLogin";
import ProtectedRoute from "./routes/ProtectedRoute";

const AppLayout = React.lazy(() => import("./layouts/AppLayout")); // 오타 수정: laylouts -> layouts
const MainPage = React.lazy(() => import("./pages/MainPage/MainPage"));
const RecordPage = React.lazy(() => import("./pages/RecordPage/RecordPage"));
const MyPage = React.lazy(() => import("./pages/mypage/Mypage"));
const ErrorPage = React.lazy(() => import("./common/pages/ErrorPage"));
const LoadingPage = React.lazy(() => import("./common/pages/LoadingPage"));

export const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoadingPage />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "record",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RecordPage />
          </Suspense>
        ),
      },
      // 로그인 중계
      {
        path: "auth",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RedirectToGoogleLogin />
          </Suspense>
        ),
      },
      // 로그인 유저만 mypage
      {
        path: "mypage",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingPage />}>
              <MyPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
];

function App() {
  return null;
}

export default App;
