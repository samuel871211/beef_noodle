type ImageURL = string;
import { Timestamp } from "firebase/firestore/lite";

export type BeefNoodleComment = {
  /**
   * 陣列的index，從DB取回comments的時候才會產生
   */
  key: number;
  score: number;
  storeName: string;
  visitDate: Date;
  itemName: string;
  itemPrice: number;
  images: ImageURL[];
  noodleScore?: number;
  noodleDescription?: string;
  beefScore?: number;
  beefDescription?: string;
  tendonScore?: number;
  tendonDescription?: string;
  tripeScore?: number;
  tripeDescription?: string;
  soupScore?: number;
  soupDescription?: string;
  overallDescription?: string;
  wantToVisitAgain: boolean;
};

export type BeefNoodleCommentFromFirestore = Omit<
  BeefNoodleComment,
  "visitDate" | "key"
> & {
  visitDate: Timestamp;
};
