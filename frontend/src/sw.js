importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCF2s8lAwrDHDwgHFfJnSM5XV_O1tGPadA",
  authDomain: "c210-67728.firebaseapp.com",
  databaseURL: "https://c210-67728-default-rtdb.firebaseio.com",
  projectId: "c210-67728",
  storageBucket: "c210-67728.appspot.com",
  messagingSenderId: "1085114030378",
  appId: "1:1085114030378:web:ca44737c5db69c513a6653",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notifocation.title;
  const notificationOptions = {
    body: payload.notifocation.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
