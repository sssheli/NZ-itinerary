const firebaseConfig = {
  apiKey: "AIzaSyA5verxtsQoyzi4DeFfQtX5oAtKbZ48Keo",
  authDomain: "nz2026-itinerary-memories.firebaseapp.com",
  projectId: "nz2026-itinerary-memories",
  storageBucket: "nz2026-itinerary-memories.firebasestorage.app",
  messagingSenderId: "215555629840",
  appId: "1:215555629840:web:1395eccf2312afa0a9bb95"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

let currentFirebaseUser = null;

// Sign in quietly without email/password
auth.signInAnonymously()
  .then(userCredential => {
    currentFirebaseUser = userCredential.user;

    window.nzFirebase = {
      auth,
      db,
      storage,
      getUser: () => currentFirebaseUser
    };

    console.log("Firebase connected");
    console.log("Anonymous user:", currentFirebaseUser.uid);
  })
  .catch(error => {
    console.error("Firebase anonymous auth error:", error);
  });