import { createContext } from "react";
import { Firestore } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";
import { GoogleAuthProvider, Auth } from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope(
  "https://www.googleapis.com/auth/contacts.readonly"
);
const GlobalContext = createContext({
  firestore: {} as Firestore,
  firebaseStorage: {} as FirebaseStorage,
  googleAuthProvider: {} as GoogleAuthProvider,
  auth: {} as Auth,
});

export default GlobalContext;
