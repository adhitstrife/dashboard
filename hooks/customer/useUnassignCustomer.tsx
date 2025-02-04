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

const useUnassignCustomer = () => {
    const [isLoadingUnassignCustomer, setIsLoadingUnassignCustomer] = useState(false);
    
    const unassignCustomer = async (id: number) => {
        try {
            setIsLoadingUnassignCustomer(true);
            const url = `/backend/api/customer/unassign`;
            const response = await axios.post(url,{
                assign_id: id
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );

            notifications.show({
                title: 'Approve Complete',
                message: `Success unassign sales from customer`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when unassign sales ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingUnassignCustomer(false)
        }
    }

    return { unassignCustomer, isLoadingUnassignCustomer }
}
export default useUnassignCustomer;
