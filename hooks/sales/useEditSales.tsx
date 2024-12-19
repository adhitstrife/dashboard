import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useEditSales = () => {
    const [isLoadingEditSales, setIsLoadingEditSales] = useState(false);
    const [salesData, setSalesDate] = useState<salesResponse>();
    
    const updateDataSales = async (id: number, payload: salesPayload) => {
        try {
            setIsLoadingEditSales(true);
            const url = `/backend/api/sales/${id}`;
            const response = await axios.put(url, payload, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: salesResponse = response.data
            setSalesDate(json)

            notifications.show({
                title: 'Saving Complete',
                message: `Success update sales data`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })

        } catch (error) {
            notifications.show({
                title: 'Saving Failed',
                message: `Error when update sales data ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingEditSales(false)
        }
    }

    return { updateDataSales, salesData, isLoadingEditSales }
}
export default useEditSales;