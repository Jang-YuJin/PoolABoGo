import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <header>헤더</header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>푸터</footer>
    </div>
  )
}

export default AppLayout
