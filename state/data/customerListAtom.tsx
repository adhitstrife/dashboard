import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import { atom } from "jotai";

export const customerListAtom = atom<customerListResponse | null>(null)