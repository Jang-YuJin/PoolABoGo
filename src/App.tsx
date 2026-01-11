import React, { Suspense, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

const AppLayout = React.lazy(() => import('./laylouts/AppLayout'));
const Main = React.lazy(() => import('./pages/main/Main'));

function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<AppLayout></AppLayout>}>
          <Route index element={<Main></Main>}></Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
