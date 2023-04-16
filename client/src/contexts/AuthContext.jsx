import React, { useContext, useEffect, useState } from 'react';
import firebase, { db } from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth(firebase);
  auth.setPersistence(browserSessionPersistence)
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  function signup(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        await setDoc(doc(db, 'users', cred.user.uid), { role: 'User' });
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
      .catch(() => setLoading(false));
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
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        setCurrentUser(user);
      let docRef = null;
      if (user) {
        docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((data) => {
          user.role = data.data()?.role;
          setCurrentUser(user);
        });
      }
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, login, signup, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
