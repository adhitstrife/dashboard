import leaveData from "@/app/interface/response/leave/leaveData";
import visitData from "@/app/interface/response/visit/visitData";
import { atom } from "jotai";

export const visitDetailAtom = atom<visitData | null>(null)