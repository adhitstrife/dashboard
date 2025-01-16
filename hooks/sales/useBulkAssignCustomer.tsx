import selectData from "@/app/interface/component/selectData";
import customerBulkAssign from "@/app/interface/payload/customerBulkAssign";
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



const useBulkAssignCustomer = () => {
    const [isLoadingBulkAssignCustomer, setIsLoadingBulkAssignCustomer] = useState(false);
    const [customerData, setCustomerData] = useState<customerDetailResponse>();
    
    const assignCustomers = async (payload: customerBulkAssign) => {
        try {
            setIsLoadingBulkAssignCustomer(true);
            const url = '/backend/api/customer/bulk/assign';
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
                message: `Success BulkA ssigning customers`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })

        } catch (error: any) {
            const errorResponse: ErrorResponse = error.response.data;
            if (errorResponse.code == 400) {
                for (const [field, errorsMessage] of Object.entries(errorResponse.message)) {
                    console.log(error)
                    notifications.show({
                        title: `THere is error at field ${field}`,
                        message: `Details: ${errorsMessage}`,
                        color: 'red',
                        icon: <IconX size={20} stroke={1.5} />,
                        position: 'top-right'
                    })
                  }
            } else {
                notifications.show({
                    title: 'Saving Failed',
                    message: `Error when assign customers ${error}`,
                    color: 'red',
                    icon: <IconX size={20} stroke={1.5} />,
                    position: 'top-right'
                })
            }
            return error;
        } finally {
            setIsLoadingBulkAssignCustomer(false)
        }
    }

    return { assignCustomers, customerData, isLoadingBulkAssignCustomer }
}
export default useBulkAssignCustomer;
