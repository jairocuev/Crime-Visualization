const { async } = require("@firebase/util");
const express= require("express");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const app= express();

const serviceAccount = require('./env/keys.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getCrimes(){return await db.collection('Crimes').get();}; 
getCrimes().then((a)=> {
  a.forEach((b)=>console.log(b.data()))
    });


app.listen(5000, ()=> {console.log("server is running on 5000")});