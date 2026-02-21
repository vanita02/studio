'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { app } from '@/firebase/config';

const auth = getAuth(app);

// It's a good practice to export the initialized auth object
// and the functions you'll use to interact with it.
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut as signOut,
  onAuthStateChanged,
  type User,
};
