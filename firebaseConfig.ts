import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth, getAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDmnvfEyyA3yWAiW4iRBHp3ySBP4lZ2w0Y",
//   authDomain: "chatapp-91cc3.firebaseapp.com",
//   projectId: "chatapp-91cc3",
//   storageBucket: "chatapp-91cc3.firebasestorage.app",
//   messagingSenderId: "639157417978",
//   appId: "1:639157417978:web:94480ad1ab7d3a44c55643"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// })

// export const db = getFirestore(app);

// export const userRef = collection(db, "users");
// export const roomRef = collection(db, "rooms");


const firebaseConfig = {
  apiKey: "AIzaSyB0PboZ1YD2oyHmsRsJfJOoBvyBFJoT5hM",
  authDomain: "chatapp-2-ad810.firebaseapp.com",
  projectId: "chatapp-2-ad810",
  storageBucket: "chatapp-2-ad810.firebasestorage.app",
  messagingSenderId: "926995940890",
  appId: "1:926995940890:web:f6e3e237963424419573a3"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");