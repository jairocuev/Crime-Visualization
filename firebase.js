const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require('./keys.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

exports.db = db;