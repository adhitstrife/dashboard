import attendanceListResponse from "@/app/interface/response/attendance/attendanceListResponse";
import { attendanceListAtom } from "@/state/data/attendance/attendanceListAtom";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetListAttendance = () => {
    const [isLoadingGetListAttendance, setIsLoadingGetListAttendance] = useState(false);
    const setAttendanceData = useSetAtom(attendanceListAtom)
    
    const getListAttendance = async (page: number = 1, page_size: number = 10, is_active?: boolean, sales_id?: number ) => {
        try {
            setIsLoadingGetListAttendance(true);
            const url = `/backend/api/attendance?sales_id=${sales_id ? sales_id : ''}&is_active=${is_active ? is_active : ''}&page=${page}&page_size=${page_size}`;
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

    return { getListAttendance, isLoadingGetListAttendance }
}
export default useGetListAttendance;
