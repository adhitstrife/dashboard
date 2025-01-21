import logListResponse from "@/app/interface/response/activity_logs/logListResponse";
import { atom } from "jotai";

export const logListAtom = atom<logListResponse | null>(null)