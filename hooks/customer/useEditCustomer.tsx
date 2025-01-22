import selectData from "@/app/interface/component/selectData";
import customerPayload from "@/app/interface/payload/customerPayload";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import customerDetailResponse from "@/app/interface/response/customer/customerDetailResponse";
import ErrorResponse from "@/app/interface/response/error/error";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useEditCustomer = () => {
    const [isLoadingEditCustomer, setIsLoadingEditCustomer] = useState(false);
    const [customerData, setCustomerData] = useState<customerDetailResponse>();
    
    const updateNewCustomer = async (id: number, payload: customerPayload) => {
        try {
            setIsLoadingEditCustomer(true);
            const url = `/backend/api/customers/${id}`;
            const response = await axios.put(url, payload, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: customerDetailResponse = response.data
            setCustomerData(json)

            notifications.show({
                title: 'Saving Complete',
                message: `Success Editing new sales`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })

        } catch (error: any) {
            const errorResponse: ErrorResponse = error.response.data;
            if (errorResponse.code == 400) {
                errorResponse.error.map((error, index) => (
                    error.messages.map((message, index) => (
                        notifications.show({
                            title: `Validation error at ${error.field}`,
                            message: `${message}`,
                            color: 'red',
                            icon: <IconX size={20} stroke={1.5} />,
                            position: 'top-right'
                        })
                    ))
                ))
            } else {
                notifications.show({
                    title: 'Saving Failed',
                    message: `Error when store new customer data ${error}`,
                    color: 'red',
                    icon: <IconX size={20} stroke={1.5} />,
                    position: 'top-right'
                })
            }
            return error;
        } finally {
            setIsLoadingEditCustomer(false)
        }
    }

    return { updateNewCustomer, customerData, isLoadingEditCustomer }
}
export default useEditCustomer;
