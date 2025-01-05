import visitFilterInterface from "@/app/interface/payload/visitFilter";
import { atom } from "jotai";

export const visitFilterAtom = atom<visitFilterInterface>({
    salesId: undefined,
    customerId: undefined,
    category: undefined,
    startDate: "",
    endDate: "",
})