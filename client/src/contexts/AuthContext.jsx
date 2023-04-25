import React, { useContext, useEffect, useState } from 'react';
import firebase from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addUser, getUser } from '../api';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth(firebase);
  auth.setPersistence(browserSessionPersistence);
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  function signup(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        await addUser({ uid: cred.user.uid });
        navigate('/');
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        throw new Error(e);
      });
  }

  function login(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        throw new Error(e);
      });
  }

  function logout() {
    setLoading(true);
    return signOut(auth)
      .then(function () {
        setCurrentUser(null);
        navigate('/');
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }

  useEffect(() => {
    const local = Object.keys(window.sessionStorage)?.filter((item) =>
      item.startsWith('firebase:authUser')
    )[0];
    if (local) {
      const user = JSON.parse(window.sessionStorage.getItem(local));
      getUser(user.uid).then((u) => {
        user.role = u.role;
        setCurrentUser(user);
      });
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        getUser(user.uid).then((u) => {
          user.role = u.role;
          setCurrentUser(user);
        });
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const value = { currentUser, login, signup, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
