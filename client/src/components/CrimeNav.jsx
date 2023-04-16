import React from 'react';
import { Link } from 'react-router-dom';
import './NavCss/CrimeNav.scss';
import { useAuth } from '../contexts/AuthContext';
import logo from "../assets/logo.png"

function CrimeNav() {
  const { currentUser, logout, loading } = useAuth();

  return (
    <nav className="CrimeNav">
      <div className="NavLogo">
        <Link to="/" className="Home">
          <img src={logo} alt="CrimeLogo" />
        </Link>
        <h1>Atlanta Crime Visualization</h1>
      </div>

      <div className="NavContainer">
        {currentUser && currentUser.role === 'Admin' ? (
          <Link to="/admin" className="link">
            Admin Page
          </Link>
        ) : (
          <></>
        )}

        {currentUser ? (
          <Link to="/report" className="link" style={{color: 'red'}}>
            Report
          </Link>
        ) : (
          <></>
        )}
        
        <Link to="/alerts" className="link">
          Alerts
        </Link>

        {currentUser && !loading ? (
          <a onClick={()=> {logout();}} style={{textDecoration: "underline"}}>{currentUser.email}</a>
        ) : (
          <Link to="/login" className="link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default CrimeNav;
