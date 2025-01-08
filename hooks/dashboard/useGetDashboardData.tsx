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

interface dashboardResponse {
    visits_today: number,
    visits_this_week: number,
    visits_this_month: number
}

const useGetDashboardData = () => {
    const [isLoadingGetDashboardData, setIsLoadingGetDashboardData] = useState(false);
    const [dashboardData, setDashboardData] = useState<dashboardResponse>();

    const getDashboardData = async () => {
        try {
            setIsLoadingGetDashboardData(true);
            const url = `/backend/api/dashboard`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: dashboardResponse = response.data
            setDashboardData(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when get dashboard data ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetDashboardData(false)
        }
    }

    return { getDashboardData, isLoadingGetDashboardData, dashboardData }
}
export default useGetDashboardData;
