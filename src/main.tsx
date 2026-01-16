import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";

// QueryClient 생성
const queryClient = new QueryClient();

// Router 생성
const router = createBrowserRouter(routes);        
        
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
