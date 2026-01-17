import { StrictMode, Suspense, lazy, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";

// QueryClient 생성
const queryClient = new QueryClient();

// Router 생성
const router = createBrowserRouter(routes);

// Production Devtools (배포 환경에서도 사용 가능)
const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/production').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

function App() {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // 배포 환경에서 window.toggleDevtools()로 Devtools 활성화 가능
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* 개발 환경: 기본 Devtools */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      {/* 배포 환경: Lazy loaded Devtools (window.toggleDevtools()로 활성화) */}
      {showDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
        
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
