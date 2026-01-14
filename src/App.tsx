import React, { Suspense, useState, type ErrorInfo, type ReactNode } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

const AppLayout = React.lazy(() => import('./laylouts/AppLayout'));
const RecordPage = React.lazy(() => import('./pages/record/RecordPage'));

class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('에러 발생:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <h1>오류가 발생했습니다</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
        <Routes>
          <Route path='/' element={<AppLayout></AppLayout>}>
            <Route index element={<RecordPage></RecordPage>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
