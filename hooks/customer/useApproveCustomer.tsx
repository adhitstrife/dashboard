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
        } catch (error) {
            notifications.show({
                title: 'Approve Failed',
                message: `Error when approving Customer ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingApproveCustomer(false)
        }
    }

    return { approveCustomer, isLoadingApproveCustomer }
}
export default useApproveCustomer;
