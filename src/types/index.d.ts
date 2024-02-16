type ImageURL = string;
import { Timestamp } from "firebase/firestore/lite";
import dayjs from "dayjs";
import { UploadProps } from "antd";

export type BeefNoodleComment = {
  /**
   * 陣列的index，從DB取回comments的時候才會產生
   */
  key: number;
  storeName: string;
  score: number;
  visitDate: Date;
  itemName: string;
  itemPrice: number;
  wantToVisitAgain: boolean;
  noodleScore?: number;
  noodleDescription?: string;
  soupScore?: number;
  soupDescription?: string;
  beefScore?: number;
  beefDescription?: string;
  tendonScore?: number;
  tendonDescription?: string;
  tripeScore?: number;
  tripeDescription?: string;
  images: ImageURL[];
  overallDescription?: string;
};

export type BeefNoodleCommentForm = Omit<
  BeefNoodleComment,
  "visitDate" | "key" | "images"
> & {
  visitDate: dayjs.Dayjs;
  images: NonNullable<UploadProps["fileList"]>;
};

export type BeefNoodleCommentFirestore = Omit<
  BeefNoodleComment,
  "visitDate" | "key"
> & {
  visitDate: Timestamp;
};
