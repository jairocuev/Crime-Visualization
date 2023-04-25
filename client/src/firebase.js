import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  type: import.meta.env.VITE_TYPE,
  private_key_id: import.meta.env.VITE_PRIVATE_KEY_ID,
  private_key: import.meta.env.VITE_PRIVATE_KEY,
  client_email: import.meta.env.VITE_CLIENT_EMAIL,
  client_id: import.meta.env.VITE_CLIENT_ID,
  auth_uri: import.meta.env.VITE_AUTH_URI,
  token_uri: import.meta.env.VITE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.VITE_AUTO_PROVIDER_CERT_URL,
  client_x509_cert_url: import.meta.env.VITE_CLIENT_CERT_URL,
};

const app = initializeApp(firebaseConfig);

export default app;
