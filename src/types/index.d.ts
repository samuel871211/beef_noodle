type ImageURL = string;
import { Timestamp } from "firebase/firestore/lite";
import dayjs from "dayjs";
import { UploadProps } from "antd";

export type BeefNoodleComment = {
  key: string;
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
  // paymentMethods: number[];
};
// todo 多元支付方式
// type PaymentMethodMapping = {
//   0: 'line pay',
//   1: 'taiwan pay',
//   2: '信用卡'
// }

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
