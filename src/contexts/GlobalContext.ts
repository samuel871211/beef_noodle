import { createContext } from "react";
import { Firestore } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";

const GlobalContext = createContext({
  firestore: {} as Firestore,
  firebaseStorage: {} as FirebaseStorage,
});

export default GlobalContext;
