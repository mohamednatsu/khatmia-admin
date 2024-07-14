/* eslint-disable @typescript-eslint/no-unused-vars */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCOS2y7z3g8ollJF9ZFG64TIgiLnuzxM0c",
    authDomain: "khatmia-firebase.firebaseapp.com",
    projectId: "khatmia-firebase",
    storageBucket: "khatmia-firebase.appspot.com",
    messagingSenderId: "1085737824548",
    appId: "1:1085737824548:web:e8e628d8c0de4996d9c3b1",
    measurementId: "G-1MMPP8L9DC",
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFire);


export default appFire
