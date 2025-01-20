import leaveData from "@/app/interface/response/leave/leaveData";
import UserProfile from "@/app/interface/response/userProfile";
import { atom } from "jotai";

export const userProfileAtom = atom<UserProfile | null>(null)