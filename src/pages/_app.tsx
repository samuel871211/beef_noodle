// Related third party imports.
import type { AppProps } from "next/app";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

// Local application/library specific imports.
import "../styles/globals.css";
import GlobalContext from "../contexts/GlobalContext";

// Stateless vars declare.
const firebaseOptions: FirebaseOptions = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
const firebaseApp = initializeApp(firebaseOptions);
const firestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext.Provider value={{ firestore, firebaseStorage }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}
