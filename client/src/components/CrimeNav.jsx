import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './NavCss/CrimeNav.css'

function CrimeNav() {
  return (
    

      <nav className="CrimeNav">
        
        <div className='NavLogo'>
            <Link to="/" className='Home'>
                <img src="/Logo.png" alt="CrimeLogo" />
            </Link>
            <h1> 
               Atlanta Crime Visualization
            </h1>
        </div>

        <div className="NavContainer">
          <Link to="/admin" className='link'>
             Admin Page
          </Link>
          <Link to="/alerts" className='link'>
             Alerts
          </Link>
          <Link to="/login" className='link'>
             Login
          </Link>
          
        </div>

      </nav>

    
  )
}

export default CrimeNav