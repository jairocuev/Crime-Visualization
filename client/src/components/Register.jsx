import React, { useState } from 'react';
import "./Register.scss"
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";


export const Register = () => {
  const navigate = useNavigate();
  const {signup, currentUser} = useAuth();
  if(currentUser) return navigate('/');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');

  async function register(username,password,confirmPassword){
    if(password !== confirmPassword){
        setError('Passwords do not match.')
    }
    else{
        try{
            await signup(username,password);
        }catch(e){
            setError(e)
        }
    }
  }


  return (
    <div className='registerContainer'>
      <div className='register'>
        <h1>Register: </h1>
        {error ? error.message : <></>}
        <br />
        <label>
          UserName: <input onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={()=> register(username,password,confirmPassword)}>Login</button>
      </div>
    </div>
  );
};
