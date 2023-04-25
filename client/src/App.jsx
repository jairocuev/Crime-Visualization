import React from 'react';
import CrimeNav from './components/CrimeNav';
import './App.css';
import './App.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { AdminPage } from './components/AdminPage';
import { Alerts } from './components/Alerts';
import { Login } from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Register } from './components/Register';
import { Report } from './components/Report';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <CrimeNav />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/admin" element={<AdminPage />} exact />
            <Route path="/alerts" element={<Alerts />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/report" element={<Report />} exact />
            <Route path="/profile" element={<Profile />} exact />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
