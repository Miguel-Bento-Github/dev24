// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDo2CcrkuCtSni8Hm3U7nppw5ilkJUH804",
  authDomain: "dev24-landing.firebaseapp.com",
  projectId: "dev24-landing",
  storageBucket: "dev24-landing.appspot.com",
  messagingSenderId: "242526116576",
  appId: "1:242526116576:web:55012c5e017ffe4edc8e85",
  measurementId: "G-5DLZ16L48H", // For v >=v7.20.0 measurementId is optional
};

let analytics: Analytics, firebaseAuth: Auth;
if (window?.CookieFirst?.consent.functional) {
  const firebaseApp = initializeApp(firebaseConfig);
  analytics = getAnalytics(firebaseApp);
  firebaseAuth = getAuth();
}

export { analytics, firebaseAuth };
