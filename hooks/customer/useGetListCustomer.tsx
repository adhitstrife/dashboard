import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { customerListAtom } from "@/state/data/customer/customerListAtom";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetListCustomer = () => {
    const [isLoadingGetListCustomer, setIsLoadingGetListCustomer] = useState(false);
    const setListCustomer = useSetAtom(customerListAtom);
    
    const getListCustomer = async (page: number = 1, page_size: number = 10, name?: string, status?: string, sales_id?: number ) => {
        try {
            setIsLoadingGetListCustomer(true);
            const withStatus = status ? `&status=${status ? status : ''}` : null;
            const url = `/backend/api/customer?sales_id=${sales_id ? sales_id : ''}&status=${status ? status : ''}&page=${page}&page_size=${page_size}&keyword=${name ? name : ''}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: customerListResponse = response.data
            setListCustomer(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when get customer list ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetListCustomer(false)
        }
    }

    return { getListCustomer, isLoadingGetListCustomer }
}
export default useGetListCustomer;