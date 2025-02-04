import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetListSalesForSelect = () => {
    const [isLoadingGetListSalesForSelect, setisLoadingGetListSalesForSelect] = useState(false);
    const [listForSelesSelect, setListForSelesSelect] = useState<selectData[]>([]);
    
    const getListSalesForSelect = async (page: number = 1, page_size: number = 10, name?: string, user_type?: string) => {
        try {
            setisLoadingGetListSalesForSelect(true);
            const url = `/backend/api/sales?page=${page}&page_size=${page_size}&user_type=${user_type ? user_type : ''}&keyword=${name ? name : ''}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: salesResponse = response.data
            setListForSelesSelect(json.results.map((sales) => ({
                value: sales.id.toString(),
                label: sales.name
            })))
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
            setisLoadingGetListSalesForSelect(false)
        }
    }

    return { getListSalesForSelect, listForSelesSelect, isLoadingGetListSalesForSelect }
}
export default useGetListSalesForSelect;
