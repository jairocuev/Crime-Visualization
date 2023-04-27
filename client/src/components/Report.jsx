import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import './Report.scss';
import { addReport, api } from '../api';
import * as jose from 'jose';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import queryString from 'query-string';

export const Report = () => {
  const search = queryString.parse(location.search);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [codeName, setCodeName] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [address, setAddress] = useState('');
  const [locationType, setLocationType] = useState('');
  const [reportDate, setReportDate] = useState('');

  useEffect(() => {
    if (search.latitude) setLat(search.latitude);
    if (search.longitude) setLong(search.longitude);
  }, []);

  useEffect(() => {
    if (!currentUser) return navigate('/');
  }, [currentUser]);

  async function submitReport(crime) {
    const secret = new TextEncoder().encode('teststring');

    const jwt = await new jose.SignJWT({ uid: currentUser.uid })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);

    api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    addReport(crime, currentUser.uid).then(() => {
      toast.success('Report(s) submited...', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    });
    navigate('/');
  }

  return (
    <div>
      <div className="reportContainer">
        <div className="report">
          <h1>Report a Crime: </h1>
          <FormControl
            sx={{ m: 1, minWidth: 120, margin: 1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '50% 50%',
              gap: '1vh',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(value) => setCodeName(value.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Longitude"
              variant="outlined"
              value={long}
              onChange={(value) => setLong(value.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Latitude"
              variant="outlined"
              value={lat}
              onChange={(value) => setLat(value.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              onChange={(value) => setAddress(value.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                id="typeInput"
                label="Type"
                value={locationType}
                onChange={(value) => setLocationType(value.target.value)}
              >
                <MenuItem value="All Other Larceny">All Other Larceny</MenuItem>
                <MenuItem value="Theft From Motor Vehicle">
                  Theft From Motor Vehicle
                </MenuItem>
                <MenuItem value="Drug/Narcotic Violations">
                  Drug/Narcotic Violations
                </MenuItem>
                <MenuItem value="Simple Assault">Simple Assault</MenuItem>
                <MenuItem value="Weapon Law Violations">
                  Weapon Law Violations
                </MenuItem>
                <MenuItem value="Aggravated Assault">
                  Aggravated Assault
                </MenuItem>
                <MenuItem value="Shoplifting">Shoplifting</MenuItem>
                <MenuItem value="Destruction/Damage/Vandalism of Property">
                  Destruction/Damage/Vandalism of Property
                </MenuItem>
                <MenuItem value="Theft From Building">
                  Theft From Building
                </MenuItem>
                <MenuItem value="Burglary/Breaking & Entering">
                  Burglary/Breaking & Entering
                </MenuItem>
                <MenuItem value="Credit Card/Automated Teller Machine Fraud">
                  Credit Card/Automated Teller Machine Fraud
                </MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value) => {
                  setReportDate(value.$d);
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              submitReport({
                location: { long: long, lat: lat, address: address },
                codeName,
                reportDate,
                locationType,
              });
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
