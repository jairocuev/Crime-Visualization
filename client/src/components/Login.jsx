import React, { useState } from 'react';
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const {login, currentUser} = useAuth();
  if(currentUser) return navigate('/');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function signIn(){
    try{
      await login(username,password);
    }catch(e){
      setError(e.message);
    }
  }

  return (
    <div className='loginContainer'>
      <div className='login'>
        <h1>Login: </h1>
        {error ? error : <></>}
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
        <button onClick={()=> signIn(username,password)}>Login</button>

        <br />
        <br />
        <Link to={'/register'}>Not Registered? Click here to Sign Up</Link>

      </div>

    </div>
  );
};
