// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqto90IoqXtYKt8CERuM6Lir8YoAfW05M",
    authDomain: "test-firebase-3e394.firebaseapp.com",
    projectId: "test-firebase-3e394",
    storageBucket: "test-firebase-3e394.firebasestorage.app",
    messagingSenderId: "207481373680",
    appId: "1:207481373680:web:38ead6981e075d3a80d335",
    measurementId: "G-F9ZM73VCP4"
};

firebase.initializeApp(firebaseConfig);

console.log(firebase.app().name);