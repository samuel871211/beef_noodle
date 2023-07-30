import { createContext } from "react";
import { CollectionReference } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";
import { BeefNoodleCommentFromFirestore } from "../types";

const GlobalContext = createContext({
  collectionRef: {} as CollectionReference<BeefNoodleCommentFromFirestore>,
  firebaseStorage: {} as FirebaseStorage,
});

export default GlobalContext;
