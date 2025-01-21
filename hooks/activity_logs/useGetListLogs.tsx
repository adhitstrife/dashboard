import customerListResponse from "@/app/interface/response/customer/customerListResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import visitListResponse from "@/app/interface/response/visit/visitListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { leaveListAtom } from "@/state/data/leave/leaveListAtom";
import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react"
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { visitFilterAtom } from "@/state/data/visit/visitFilterAtom";
import { logListAtom } from "@/state/data/activity_logs/logsListAtom";
import logListResponse from "@/app/interface/response/activity_logs/logListResponse";

const useGetListLogs = () => {
    const [isLoadingGetListLogs, setIsLoadingGetListLogs] = useState(false);
    const setLogsData = useSetAtom(logListAtom);
    
    const getListLogs = async (page: number = 1, page_size: number = 10, type?: string) => {
        try {
            setIsLoadingGetListLogs(true);
            const url = `/backend/api/activity/logs?page=${page}&page_size=${page_size}&action_type=${type ? type : ''}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: logListResponse = response.data
            setLogsData(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when get Logs list ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetListLogs(false)
        }
    }

    return { getListLogs, isLoadingGetListLogs }
}
export default useGetListLogs;
