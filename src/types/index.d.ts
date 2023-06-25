type ImageURL = string;

export type TableDataType = {
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
