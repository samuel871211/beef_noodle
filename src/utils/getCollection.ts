import {
  collection,
  Firestore,
  CollectionReference,
  DocumentData,
} from "firebase/firestore/lite";

export default getCollection;

/**
 * @description A helper function that add the type to the collection data
 */
function getCollection<T extends DocumentData>(
  firestore: Firestore,
  path: string
) {
  return collection(firestore, path) as CollectionReference<T>;
}
