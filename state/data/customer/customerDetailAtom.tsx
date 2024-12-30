import customerData from "@/app/interface/response/customer/customerData";
import { atom } from "jotai";

export const customerDetailAtom = atom<customerData | null>(null)