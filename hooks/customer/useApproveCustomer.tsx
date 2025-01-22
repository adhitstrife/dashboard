import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import ErrorResponse from "@/app/interface/response/error/error";
import salesDetailResponse from "@/app/interface/response/sales/salesDetailResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useApproveCustomer = () => {
    const [isLoadingApproveCustomer, setIsLoadingApproveCustomer] = useState(false);
    
    const approveCustomer = async (id: number) => {
        try {
            setIsLoadingApproveCustomer(true);
            const url = `/backend/api/customer/approve`;
            const response = await axios.post(url,{
                'customer_id': id 
            },{
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );

            notifications.show({
                title: 'Approve Complete',
                message: `Success approving Customer data`,
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
            setIsLoadingApproveCustomer(false)
        }
    }

    return { approveCustomer, isLoadingApproveCustomer }
}
export default useApproveCustomer;
