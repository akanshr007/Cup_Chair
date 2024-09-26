// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { FIREBASE_MESSAGING_KEY } from "./constant";

// const firebaseConfig = {
//   apiKey: "AIzaSyD8NLEBlQQgVKRBmYn1Rk5ouxMG3VRe078",
//   authDomain: "cupchai-d4358.firebaseapp.com",
//   projectId: "cupchai-d4358",
//   storageBucket: "cupchai-d4358.appspot.com",
//   messagingSenderId: "20299855832",
//   appId: "1:20299855832:web:f573082f04618f434424ad",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

// export const getFirebaseToken = () => {
//   return getToken(messaging, {
//     vapidKey: FIREBASE_MESSAGING_KEY,
//   })
//     .then((currentToken) => {
//       if (currentToken) {
//         // Track the token -> client mapping, by sending to backend server
//         // show on the UI that permission is secured
//         localStorage.setItem("firebaseToken", currentToken);
//       } else {
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//         // shows on the UI that permission is required
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//       // catch error while creating client token
//     });
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
