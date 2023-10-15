// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4wsGZYcBHXbdvYVDitCq4Nml6tdmvJ7g",
  authDomain: "prjetob7.firebaseapp.com",
  databaseURL: "https://prjetob7-default-rtdb.firebaseio.com",
  projectId: "prjetob7",
  storageBucket: "prjetob7.appspot.com",
  messagingSenderId: "119742183704",
  appId: "1:119742183704:web:e14ba225ab87bc9d25866d",
  measurementId: "G-7NKKE36XPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);app
const auth = getAuth(app);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}