import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import salesDetailResponse from "@/app/interface/response/sales/salesDetailResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useDeleteSales = () => {
    const [isLoadingDeleteSales, setIsLoadingDeleteSales] = useState(false);
    const [salesDetail, setSalesDetail] = useState<salesDetailResponse | null>();
    
    const deleteSales = async (id: number) => {
        try {
            setIsLoadingDeleteSales(true);
            const url = `/backend/api/sales/${id}`;
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: salesDetailResponse = response.data
            setSalesDetail(json)

            notifications.show({
                title: 'Delete Complete',
                message: `Success deleting sales data`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })
        } catch (error) {
            notifications.show({
                title: 'Delete Failed',
                message: `Error when deleting sales ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingDeleteSales(false)
        }
    }

    return { deleteSales, salesDetail, isLoadingDeleteSales, setSalesDetail }
}
export default useDeleteSales;
