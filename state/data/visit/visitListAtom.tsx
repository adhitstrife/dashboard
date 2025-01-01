import visitListResponse from "@/app/interface/response/visit/visitListResponse";
import { atom } from "jotai";

export const visitListAtom = atom<visitListResponse | null>(null)