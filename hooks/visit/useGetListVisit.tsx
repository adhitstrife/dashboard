import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import visitListResponse from "@/app/interface/response/visit/visitListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetListVisit = () => {
    const [isLoadingGetListVisit, setIsLoadingGetListVisit] = useState(false);
    const [visitData, setVisitData] = useState<visitListResponse>();
    
    const getListVisit = async (page: number = 1, page_size: number = 10, name?: string, category?: string, sales_id?: number, customer_id?: number ) => {
        try {
            setIsLoadingGetListVisit(true);
            const url = `/backend/api/visit?sales_id=${sales_id ? sales_id : ''}&customer_id=${customer_id ? customer_id : ""}&category=${category ? category : ''}page=${page}&page_size=${page_size}&keyword=${name ? name : ''}`;
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

    return { getListVisit, visitData, isLoadingGetListVisit }
}
export default useGetListVisit;
