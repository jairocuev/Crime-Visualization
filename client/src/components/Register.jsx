import React, { useState } from 'react';
import './Register.scss';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, TextField } from '@mui/material';
import { toast } from 'react-toastify';

export const Register = () => {
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();
  if (currentUser) return navigate('/');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function register(username, password, confirmPassword) {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setError('Passwords do not match.');
    } else {
      try {
        await signup(username, password);
      } catch (e) {
        if (e.message.includes('auth')) {
          if (e.message.includes('invalid-email')) {
            toast.error('Invalid email. Please try again.', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            setError('Invalid email. Please try again.');
            return;
          }
          if (e.message.includes('weak-password')) {
            toast.error(
              'Password should be at least 6 characters. Please try again.',
              {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              }
            );
            setError(
              'Password should be at least 6 characters. Please try again.'
            );
            return;
          }
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
  }

  return (
    <div className="registerContainer">
      <div className="register">
        <h1>Register: </h1>
        {error ? error : <></>}
        <FormControl
          sx={{ m: 1, minWidth: 120, margin: 1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '100%',
            gap: '1vh',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(value) => setUsername(value.target.value)}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(value) => setPassword(value.target.value)}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            type="password"
            variant="outlined"
            onChange={(value) => setConfirmPassword(value.target.value)}
          />
          <br />
          <Button
            variant="contained"
            onClick={() => register(username, password, confirmPassword)}
          >
            Submit
          </Button>
        </FormControl>
      </div>
    </div>
  );
};
