import { initializeApp, getApps, getApp } from 'firebase/app';

// This is a placeholder configuration.
// We will populate this with your actual Firebase project details in the next step.
const firebaseConfig = {
  apiKey: "AIzaSyC... (placeholder)",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

let app;
// Initialize Firebase
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
