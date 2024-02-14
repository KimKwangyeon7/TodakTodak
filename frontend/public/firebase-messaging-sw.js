import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCF2s8lAwrDHDwgHFfJnSM5XV_O1tGPadA",
  authDomain: "c210-67728.firebaseapp.com",
  databaseURL: "https://c210-67728-default-rtdb.firebaseio.com",
  projectId: "c210-67728",
  storageBucket: "c210-67728.appspot.com",
  messagingSenderId: "1085114030378",
  appId: "1:1085114030378:web:ca44737c5db69c513a6653",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

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
