import React, { Suspense } from 'react'
import './App.css'

const AppLayout = React.lazy(() => import('./laylouts/AppLayout'));
const RecordPage = React.lazy(() => import('./pages/record/RecordPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
            <RecordPage />
          </Suspense>
        ),
      },
    ],
  },
];

function App() {
  return null;
}

export default App
