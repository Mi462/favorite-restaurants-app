import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBt4jZpETgzrsD4_oPqewFe3wer0bq4BfI",
  authDomain: "favorite-restaurants-app.firebaseapp.com",
  projectId: "favorite-restaurants-app",
  storageBucket: "favorite-restaurants-app.appspot.com",
  messagingSenderId: "398862461406",
  appId: "1:398862461406:web:fb0901af87b0906339954f",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const db = getFirestore(app);
export default storage;
// export const auth = getAuth(app);
