//firebasee.js


  // Import the functions you need from the SDKs you need
    import {initializeApp} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
    import {getAuth} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
    import {getFirestore} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
  //import {getAnalytics} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAYiI3dlc_tN5947s26flIK8aQ3pPXcAC4",
    authDomain: "college-voting-system-7df68.firebaseapp.com",
    projectId: "college-voting-system-7df68",
    storageBucket: "college-voting-system-7df68.firebasestorage.app",
    messagingSenderId: "802933121105",
    appId: "1:802933121105:web:63ef20ad44edae26009870",
    measurementId: "G-5BDFTNNP24"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

    export const auth = getAuth(app);
    export const db = getFirestore(app);




