// Related third party imports.
import type { AppProps } from "next/app";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Local application/library specific imports.
import "../styles/globals.css";
import GlobalContext from "../contexts/GlobalContext";
import getCollection from "../utils/getCollection";
import { BeefNoodleCommentFirestore } from "../types";

// Stateless vars declare.
const firebaseOptions: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_databaseURL,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};
const firebaseApp = initializeApp(firebaseOptions);
const firestore = getFirestore(firebaseApp);
const collectionRef = getCollection<BeefNoodleCommentFirestore>(
  firestore,
  "beefNoodleComments"
);
const firebaseStorage = getStorage(firebaseApp);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext.Provider
      value={{ collectionRef, firebaseStorage, googleAuthProvider, auth }}
    >
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}
