import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQMydeLyzCNdQb_BvA4HGBJ-CX0OkfVr4",
  authDomain: "react-native-test-2ec61.firebaseapp.com",
  databaseURL:
    "https://react-native-test-2ec61-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-test-2ec61",
  storageBucket: "react-native-test-2ec61.appspot.com",
  messagingSenderId: "797323952713",
  appId: "1:797323952713:web:1b077570425304470f3598",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, storage, db };
