import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AllNotes from './components/AllNotes/AllNotes';
import Account from './components/Account/Account';
import Login from './components/Login/Login';

function App() {
  const isLoggedIn = !!sessionStorage.getItem("token");

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/allnotes" element={<AllNotes />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
