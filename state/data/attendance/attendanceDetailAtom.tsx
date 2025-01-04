import attendanceData from "@/app/interface/response/attendance/attendanceData";
import { atom } from "jotai";

export const attendanceDetailAtom = atom<attendanceData | null>(null)