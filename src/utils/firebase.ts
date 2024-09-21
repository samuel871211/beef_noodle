// Related third party imports.
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDocs, getFirestore, query, orderBy } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Local application/library specific imports.
import getCollection from "../utils/getCollection";
import { BeefNoodleCommentFirestore, BeefNoodleComment } from "../types";

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
const beefNoodleCommentsCollectionRef =
  getCollection<BeefNoodleCommentFirestore>(firestore, "beefNoodleComments");
const allBeefNoodleCommentsQuery = query(
  beefNoodleCommentsCollectionRef,
  orderBy("visitDate", "asc")
);
const firebaseStorage = getStorage(firebaseApp);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
async function getAllBeefNoodleComments(): Promise<BeefNoodleComment[]> {
  const querySnapshot = await getDocs(allBeefNoodleCommentsQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return Object.assign(data, {
      id: doc.id,
      visitDate: data.visitDate.toDate(),
    });
  });
}

export {
  allBeefNoodleCommentsQuery,
  beefNoodleCommentsCollectionRef,
  firebaseStorage,
  auth,
  googleAuthProvider,
  getAllBeefNoodleComments,
};
