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

const useDeleteCustomer = () => {
    const [isLoadingDeleteCustomer, setIsLoadingDeleteCustomer] = useState(false);
    
    const deleteCustomer = async (id: number) => {
        try {
            setIsLoadingDeleteCustomer(true);
            const url = `/backend/api/customers/${id}`;
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );

            notifications.show({
                title: 'Delete Complete',
                message: `Success deleting Customer data`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })
        } catch (error) {
            notifications.show({
                title: 'Delete Failed',
                message: `Error when deleting Customer ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingDeleteCustomer(false)
        }
    }

    return { deleteCustomer, isLoadingDeleteCustomer }
}
export default useDeleteCustomer;
