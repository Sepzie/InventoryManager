// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCTjDqLrxL24Rohs1Y0DmNSKJ1OdOwTKY",
  authDomain: "k2kinginventorymanager.firebaseapp.com",
  projectId: "k2kinginventorymanager",
  storageBucket: "k2kinginventorymanager.appspot.com",
  messagingSenderId: "346533657299",
  appId: "1:346533657299:web:6a331425edff4b77827226",
  measurementId: "G-X04JHPMGDJ"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);