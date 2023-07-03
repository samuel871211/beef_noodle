type ImageURL = string;

export type BeefNoodleComment = {
  /**
   * 陣列的index
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
  /**
   * firestore 取回來的 `Date` 會轉成這個格式
   */
  visitDate: { seconds: number; nanoseconds: number };
};
