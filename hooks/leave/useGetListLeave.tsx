import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import leaveListResponse from "@/app/interface/response/leave/leaveListResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetListLeave = () => {
    const [isLoadingGetListLeave, setIsLoadingGetListLeave] = useState(false);
    const [leaveData, setLeaveData] = useState<leaveListResponse>();
    
    const getListLeave = async (page: number = 1, page_size: number = 10, status?: string, account_id?: number ) => {
        try {
            setIsLoadingGetListLeave(true);
            const url = `/backend/api/leaves?account_id=${account_id ? account_id : ''}&status=${status ? status : ''}page=${page}&page_size=${page_size}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: leaveListResponse = response.data
            setLeaveData(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when get Leave list ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetListLeave(false)
        }
    }

    return { getListLeave, leaveData, isLoadingGetListLeave }
}
export default useGetListLeave;
