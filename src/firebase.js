// import "dotenv/config"

import firebase,{initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";


// const app= initializeApp({
//     apiKey: "AIzaSyDa2x4v_xVq3WUv8q95Q7HgqVpyZudsd4I",
//   authDomain: "keynotes-dev.firebaseapp.com",
//   projectId: "keynotes-dev",
//   storageBucket: "keynotes-dev.appspot.com",
//   messagingSenderId: "99088948829",
//   appId: "1:99088948829:web:04cf1bf08a18be02faf7b4"
// })

const app= initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})
export const auth = getAuth(app);
export default app;