import { createContext } from "react";
import { CollectionReference } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";
import { BeefNoodleCommentFromFirestore } from "../types";
import { GoogleAuthProvider, Auth } from "firebase/auth";

const GlobalContext = createContext({
  collectionRef: {} as CollectionReference<BeefNoodleCommentFromFirestore>,
  firebaseStorage: {} as FirebaseStorage,
  googleAuthProvider: {} as GoogleAuthProvider,
  auth: {} as Auth,
});

export default GlobalContext;
