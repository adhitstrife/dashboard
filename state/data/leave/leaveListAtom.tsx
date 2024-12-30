import leaveListResponse from "@/app/interface/response/leave/leaveListResponse";
import { atom } from "jotai";

export const leaveListAtom = atom<leaveListResponse | null>(null)