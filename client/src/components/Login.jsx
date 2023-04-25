import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, FormControl, TextField } from '@mui/material';
import { toast } from 'react-toastify';

export const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  if (currentUser) return navigate('/');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function signIn() {
    try {
      await login(username, password);
      toast.success('Successfully logged in..', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (e) {
      if (e.message.includes('auth')) {
        toast.error('Invalid credentials. Please try again.', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setError('Invalid credentials. Please try again.');
        return;
      }
      toast.error('Internal Server Error.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  return (
    <div className="loginContainer">
      <div className="login">
        <h1>Login: </h1>
        {error ? error : <></>}
        <FormControl
          sx={{ m: 1, minWidth: 120, margin: 1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '100%',
            gap: '2vh',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(value) => setUsername(value.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(value) => setPassword(value.target.value)}
          />

          <Link to={'/register'}>Not Registered? Click here to Sign Up</Link>
          <Button
            variant="contained"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </Button>
        </FormControl>
      </div>
    </div>
  );
};
