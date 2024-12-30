import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import salesDetailResponse from "@/app/interface/response/sales/salesDetailResponse";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { leaveStatusAtom } from "@/state/data/leave/leaveStatusAtom";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react"

const useApproveLeave = () => {
    const [isLoadingApproveLeave, setIsLoadingApproveLeave] = useState(false);
    const statusLeave = useAtomValue(leaveStatusAtom);

    
    const approveLeave = async (id: number) => {
        try {
            setIsLoadingApproveLeave(true);
            const url = `/backend/api/leaves/status`;
            const response = await axios.post(url,{
                'leave_id': id, 
                'status': statusLeave
            },{
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );

            notifications.show({
                title: 'Approve Complete',
                message: `Success approving Leave data`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })
        } catch (error) {
            notifications.show({
                title: 'Approve Failed',
                message: `Error when approving Leave ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingApproveLeave(false)
        }
    }

    return { approveLeave, isLoadingApproveLeave }
}
export default useApproveLeave;
