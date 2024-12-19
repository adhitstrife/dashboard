import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetListSales = () => {
    const [isLoadingGetListSales, setIsLoadingGetListSales] = useState(false);
    const [salesData, setSalesData] = useState<salesResponse>();
    
    const getListSales = async (page: number = 1, page_size: number = 10, name?: string, ) => {
        try {
            setIsLoadingGetListSales(true);
            const url = `/backend/api/sales?page=${page}&page_size=${page_size}&name=${name ? name : ''}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: salesResponse = response.data
            setSalesData(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when get sales list ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetListSales(false)
        }
    }

    return { getListSales, salesData, isLoadingGetListSales }
}
export default useGetListSales;
