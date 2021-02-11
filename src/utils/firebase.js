import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2hwaHoWFrVNsc0aFSragq5ZTqaOmD3o4",
    authDomain: "synthetic-app.firebaseapp.com",
    databaseURL: "https://synthetic-app.firebaseio.com",
    projectId: "synthetic-app",
    storageBucket: "synthetic-app.appspot.com",
    messagingSenderId: "71616933650",
    appId: "1:71616933650:web:500c940480895722c38dcb"
  };
  export default firebase.initializeApp(firebaseConfig);