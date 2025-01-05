import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import visitListResponse from "@/app/interface/response/visit/visitListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { leaveListAtom } from "@/state/data/leave/leaveListAtom";
import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react"
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { visitFilterAtom } from "@/state/data/visit/visitFilterAtom";

const useGetListVisit = () => {
    const [isLoadingGetListVisit, setIsLoadingGetListVisit] = useState(false);
    const setVisitData = useSetAtom(visitListAtom);
    const visitFilter = useAtomValue(visitFilterAtom)
    
    const getListVisit = async (page: number = 1, page_size: number = 10) => {
        try {
            setIsLoadingGetListVisit(true);
            const selectedCategory = visitFilter.category ? `&category=${visitFilter.category}` : ''
            const url = `/backend/api/visit?sales_id=${visitFilter.salesId ? visitFilter.salesId : ''}${selectedCategory}&customer_id=${visitFilter.customerId ? visitFilter.customerId : ""}&page=${page}&page_size=${page_size}&start_date=${visitFilter.startDate ? visitFilter.startDate : ''}&end_date=${visitFilter.endDate ? visitFilter.endDate : ''}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: visitListResponse = response.data
            setVisitData(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when get visit list ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetListVisit(false)
        }
    }

    return { getListVisit, isLoadingGetListVisit }
}
export default useGetListVisit;
