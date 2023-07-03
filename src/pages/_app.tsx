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
const firebaseStorage = getStorage(firebaseApp);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext.Provider value={{ firestore, firebaseStorage }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}
