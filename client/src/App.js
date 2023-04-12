import logo from './logo.svg';
import CrimeNav from './components/CrimeNav'
import './App.css';

import { Routes, Route, BrowserRouter} from 'react-router-dom';
import  { useState } from 'react';
import { Home } from './components/Home';
import { AdminPage } from './components/AdminPage';
import { Alerts } from './components/Alerts';
import { Login } from './components/Login';
import { CrimeMap } from './components/CrimeMap';
import { GetJson } from './components/GetJson';


function App() {
  return (
    <>
    <BrowserRouter>
        <CrimeNav /> 
           <Routes >
            <Route path='/' element={<Home/>} exact />
            <Route path='/admin' element={<AdminPage/>} exact />
            <Route path='/alerts' element={<Alerts/>} exact />
            <Route path='/login' element={<Login/>} exact />
          </Routes>    
    
      </BrowserRouter>
      <GetJson/>

      
    </>
  );
}

export default App;
