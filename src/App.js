import React, { useEffect } from 'react';
import Search from './search/container/Search';
import User from './user/container/User';
import 'antd/dist/antd.min.css';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  useEffect(() => {
    const bodyEl = document.getElementsByTagName('body')[0];
    const loadingEl = document.getElementById('init-loading');
    bodyEl.removeChild(loadingEl);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/user/:name" element={<User />} />
    </Routes>
  );
}
