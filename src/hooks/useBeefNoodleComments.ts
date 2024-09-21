import useSWRImmutable from "swr/immutable";
import { getAllBeefNoodleComments } from "../utils/firebase";
import { BeefNoodleComment } from "../types";

export function useGetAllBeefNoodleComments() {
  return useSWRImmutable("beefNoodleComments", getAllBeefNoodleComments);
}

export function useAllBeefNoodleComments() {
  return useSWRImmutable<BeefNoodleComment[]>("beefNoodleComments");
}
