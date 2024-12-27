import selectData from "@/app/interface/component/selectData";
import customerPayload from "@/app/interface/payload/customerPayload";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import customerDetailResponse from "@/app/interface/response/customer/customerDetailResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useAddCustomer = () => {
    const [isLoadingAddCustomer, setIsLoadingAddCustomer] = useState(false);
    const [customerData, setCustomerData] = useState<customerDetailResponse>();
    
    const postNewCustomer = async (payload: customerPayload) => {
        try {
            setIsLoadingAddCustomer(true);
            const url = '/backend/api/customer';
            const response = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: customerDetailResponse = response.data
            setCustomerData(json)

            notifications.show({
                title: 'Saving Complete',
                message: `Success adding new sales`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })

        } catch (error) {
            notifications.show({
                title: 'Saving Failed',
                message: `Error when store new sales data ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingAddCustomer(false)
        }
    }

    return { postNewCustomer, customerData, isLoadingAddCustomer }
}
export default useAddCustomer;
