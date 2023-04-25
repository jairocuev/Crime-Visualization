import React from 'react';
import { Link } from 'react-router-dom';
import './NavCss/CrimeNav.scss';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

function CrimeNav() {
  const { currentUser, logout, loading } = useAuth();

  const signout = () => {
    logout();
    toast.success('Successfully logged out..', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <nav className="CrimeNav">
      <div className="NavLogo">
        <Link to="/" className="Home">
          <img src={logo} alt="CrimeLogo" />
        </Link>
        <h1>Atlanta Crime Visualization</h1>
      </div>

      <div className="NavContainer">
        {currentUser?.role === 'admin' ? (
          <Link to="/admin" className="link">
            Admin Page
          </Link>
        ) : (
          <></>
        )}

        {currentUser ? (
          <Link to="/report" className="link" style={{ color: 'red' }}>
            Report
          </Link>
        ) : (
          <></>
        )}

        <Link to="/alerts" className="link">
          Alerts
        </Link>

        {currentUser && !loading ? (
          <>
            <Link to={'/profile'} className="link">
              {currentUser.email}
            </Link>
            <Link
              className="link"
              onClick={() => {
                signout();
              }}
              style={{ textDecoration: 'underline', margin: '5px' }}
            >
              Logout
            </Link>
          </>
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
