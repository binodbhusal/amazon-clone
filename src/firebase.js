import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDQCh8n4qIYiQpVolTk1ZWc6nAocHWx_Xc',
  authDomain: 'clone-1b966.firebaseapp.com',
  projectId: 'clone-1b966',
  storageBucket: 'clone-1b966.appspot.com',
  messagingSenderId: '405362197696',
  appId: '1:405362197696:web:8c8d3db096b830a82bd925',
  measurementId: 'G-2EPGNTJBEX',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
