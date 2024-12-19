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

const useGetSalesDetail = () => {
    const [isLoadingGetDetailSales, setIsLoadingGetDetailSales] = useState(false);
    const [salesDetail, setSalesDetail] = useState<salesDetailResponse | null>();
    
    const getDetailSales = async (id: number) => {
        try {
            setIsLoadingGetDetailSales(true);
            const url = `/backend/api/sales/${id}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: salesDetailResponse = response.data
            setSalesDetail(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when fetch sales detail ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetDetailSales(false)
        }
    }

    return { getDetailSales, salesDetail, isLoadingGetDetailSales, setSalesDetail }
}
export default useGetSalesDetail;
