import attendanceListResponse from "@/app/interface/response/attendance/leaveListResponse";
import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import leaveListResponse from "@/app/interface/response/leave/leaveListResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetListAttendance = () => {
    const [isLoadingGetListAttendance, setIsLoadingGetListAttendance] = useState(false);
    const [attendanceData, setAttendanceData] = useState<attendanceListResponse>();
    
    const getListAttendance = async (page: number = 1, page_size: number = 10, is_active?: boolean, sales_id?: number ) => {
        try {
            setIsLoadingGetListAttendance(true);
            const url = `/backend/api/attendance?sales_id=${sales_id ? sales_id : ''}&is_active=${is_active ? is_active : ''}page=${page}&page_size=${page_size}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: attendanceListResponse = response.data
            setAttendanceData(json)
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
            setIsLoadingGetListAttendance(false)
        }
    }

    return { getListAttendance, attendanceData, isLoadingGetListAttendance }
}
export default useGetListAttendance;
