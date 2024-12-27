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

const useAssignSalesToCustomer = () => {
    const [isLoadingAssignSales, setIsLoadingAssignSales] = useState(false);
    
    const assignSalesToCustomer = async (payload: assignSales) => {
        try {
            setIsLoadingAssignSales(true);
            const url = '/backend/api/customer/assign';
            const response = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );

            notifications.show({
                title: 'Assign Complete',
                message: `Success assigning sales to customer`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })

        } catch (error) {
            notifications.show({
                title: 'Assign Failed',
                message: `Error when try assigning sales to this customer ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingAssignSales(false)
        }
    }

    return { assignSalesToCustomer, isLoadingAssignSales }
}
export default useAssignSalesToCustomer;
