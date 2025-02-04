import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import customerDetailResponse from "@/app/interface/response/customer/customerDetailResponse";
import salesDetailResponse from "@/app/interface/response/sales/salesDetailResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetCustomerDetail = () => {
    const [isLoadingGetDetailCustomer, setIsLoadingGetDetailCustomer] = useState(false);
    const [customerDetail, setCustomerDetail] = useState<customerDetailResponse | null>();
    
    const getDetailCustomer = async (id: number) => {
        try {
            setIsLoadingGetDetailCustomer(true);
            const url = `/backend/api/customers/${id}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: customerDetailResponse = response.data
            setCustomerDetail(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when fetch Customer detail ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetDetailCustomer(false)
        }
    }

    return { getDetailCustomer, customerDetail, isLoadingGetDetailCustomer, setCustomerDetail }
}
export default useGetCustomerDetail;
