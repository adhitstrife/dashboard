import leaveData from "@/app/interface/response/leave/leaveData";
import { atom } from "jotai";

export const leaveDetailAtom = atom<leaveData | null>(null)