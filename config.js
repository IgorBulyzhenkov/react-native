import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5naQoU0DfK8lNZtA5kmH_LgOhDJYEyjQ",
  authDomain: "react-native-b3e58.firebaseapp.com",
  projectId: "react-native-b3e58",
  storageBucket: "react-native-b3e58.appspot.com",
  messagingSenderId: "1022788909363",
  appId: "1:1022788909363:web:04a919980678e584f5a646",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, storage, db };
