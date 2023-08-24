import { useState } from 'react';

import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import MainPage from './Pages/MainPage';
import AddPost from './components/Forms/AddPost';
import Navbar from './components/Common/Navbar';

function App() {
  const showNavbar =
    location.pathname !== '/' && location.pathname !== '/signUp';
  return (
    <div className="poppins h-full">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />

        <Route path="/main" element={<MainPage />} />
        <Route path="/post" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
