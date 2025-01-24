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
import { accountListAtom } from "@/state/data/account/accountListAtom";
import accountListResponse from "@/app/interface/response/account/accountListResponse";

const useGetListAccounts = () => {
    const [isLoadingGetListAccount, setIsLoadingGetListAccount] = useState(false);
    const setAccountData = useSetAtom(accountListAtom);
    
    const getListAccount = async (page: number = 1, page_size: number = 10, name?: string) => {
        try {
            setIsLoadingGetListAccount(true);
            const url = `/backend/api/users?page=${page}&page_size=${page_size}&keyword=${name ? name : ''}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: accountListResponse = response.data
            setAccountData(json)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when get Account list ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetListAccount(false)
        }
    }

    return { getListAccount, isLoadingGetListAccount }
}
export default useGetListAccounts;
