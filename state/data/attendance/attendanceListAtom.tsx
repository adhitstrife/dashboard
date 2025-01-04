import attendanceListResponse from "@/app/interface/response/attendance/attendanceListResponse";
import { atom } from "jotai";

export const attendanceListAtom = atom<attendanceListResponse | null>(null)