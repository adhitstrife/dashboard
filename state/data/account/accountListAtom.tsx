import accountListResponse from "@/app/interface/response/account/accountListResponse";
import { atom } from "jotai";

export const accountListAtom = atom<accountListResponse | null>(null)