import React, { Suspense } from 'react'
import './App.css'

const AppLayout = React.lazy(() => import('./layouts/AppLayout')); // 오타 수정: laylouts -> layouts
const MainPage = React.lazy(() => import('./pages/main/MainPage'));
const RecordPage = React.lazy(() => import('./pages/record/RecordPage'));
const MyPage = React.lazy(() => import('./pages/mypage/MyPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

const LoadingFallback = <div style={{ padding: '20px' }}>Loading...</div>;

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={LoadingFallback}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={LoadingFallback}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={LoadingFallback}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: 'record',
        element: (
          <Suspense fallback={LoadingFallback}>
            <RecordPage />
          </Suspense>
        ),
      },
      {
        path: 'mypage',
        element: (
          <Suspense fallback={LoadingFallback}>
            <MyPage />
          </Suspense>
        ),
      },
    ],
  },
];

function App() {
  return null;
}

export default App;
