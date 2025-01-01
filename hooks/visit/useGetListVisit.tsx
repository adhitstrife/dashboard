import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import visitListResponse from "@/app/interface/response/visit/visitListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { leaveListAtom } from "@/state/data/leave/leaveListAtom";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react"
import { visitListAtom } from "@/state/data/visit/visitListAtom";

const useGetListVisit = () => {
    const [isLoadingGetListVisit, setIsLoadingGetListVisit] = useState(false);
    const setVisitData = useSetAtom(visitListAtom);
    
    const getListVisit = async (page: number = 1, page_size: number = 10, name?: string, category?: string, sales_id?: number, customer_id?: number ) => {
        try {
            setIsLoadingGetListVisit(true);
            const url = `/backend/api/visit?sales_id=${sales_id ? sales_id : ''}&customer_id=${customer_id ? customer_id : ""}&page=${page}&page_size=${page_size}&keyword=${name ? name : ''}`;
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
