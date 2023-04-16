import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Report.scss"

export const Report = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [codeName, setCodeName] = useState('');
  const [locationType, setLocationType] = useState('')
  const [reportDate, setReportDate] = useState('');

  useEffect(() => {
    if (!currentUser) return navigate('/');
  }, [currentUser]);

  return <div>
        <div className='reportContainer'>
      <div className='report'>
        <h1>Report a Crime: </h1>
        <br />
        <label>
          Location: <input onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Name:
          <input
            onChange={(e) => setCodeName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Location Type: 
          <select
            onChange={(e) => setLocationType(e.target.value)}
          ><option value="">Yooooooooo</option></select>
        </label>
        <br />
        <label>
          Date:
          <input
            onChange={(e) => setReportDate(e.target.value)}
          />
        </label>
        <br />
        <button>Submit</button>
      </div>
    </div>
  </div>;
};
