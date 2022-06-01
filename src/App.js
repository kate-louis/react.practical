import React from 'react';
import Search from './search/container/Search';
import User from './user/container/User';
import 'antd/dist/antd.min.css';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/user/:name" element={<User />} />
    </Routes>
  );
}
