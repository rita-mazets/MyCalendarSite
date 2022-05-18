import { initializeApp} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js"
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js"
import {getStorage } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyBobf22TRD5ARBFDnbnURtoStsPl5q8d84",
    authDomain: "calendar-f38de.firebaseapp.com",
    databaseURL: "https://calendar-f38de-default-rtdb.firebaseio.com",
    projectId: "calendar-f38de",
    storageBucket: "calendar-f38de.appspot.com",
    messagingSenderId: "983719983742",
    appId: "1:983719983742:web:47ca40bbecb17e9f24362f"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const database = getDatabase();
  export const storage = getStorage(app)