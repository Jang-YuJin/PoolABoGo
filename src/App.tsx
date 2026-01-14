import React, { Suspense, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AiSample from './pages/aiSample/AiSample';

const AppLayout = React.lazy(() => import('./layouts/AppLayout'));
const Main = React.lazy(() => import('./pages/main/Main'));
const Auth = React.lazy(() => import('./pages/auth/AuthPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Auth></Auth>}></Route>
        <Route path='/ai' element={<AiSample></AiSample>}></Route>
        {/* <Route path='/' element={<AppLayout></AppLayout>}>
          <Route index element={<Main></Main>}></Route>
        </Route> */}
      </Routes>
    </Suspense>
  )
}

export default App
