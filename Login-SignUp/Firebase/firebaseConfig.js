import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import {
  getDatabase,
  set,
  ref,
  push,
  get,
  child,
  update,
  remove,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNzZ2gm-iosbhW1713c06WChbnK-hFtf4",
  authDomain: "ebayclone-553ed.firebaseapp.com",
  databaseURL: "https://ebayclone-553ed-default-rtdb.firebaseio.com",
  projectId: "ebayclone-553ed",
  storageBucket: "ebayclone-553ed.appspot.com",
  messagingSenderId: "538591170871",
  appId: "1:538591170871:web:31ac2e2dabbf36e5970ab2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {
  db,
  set,
  ref,
  get,
  child,
  update,
  push,
  remove,
  getStorage,
  sref,
  uploadBytesResumable,
  getDownloadURL,
  onChildAdded,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
};
