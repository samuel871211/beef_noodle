import { createContext } from "react";
import { Firestore } from "firebase/firestore/lite";

const GlobalContext = createContext({
  firestore: {} as Firestore,
});

export default GlobalContext;
