import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import ErrorResponse from "@/app/interface/response/error/error";
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
        } catch (error: any) {
            const errorResponse: ErrorResponse = error.response.data;
            if (errorResponse.code == 400) {
                for (const [field, errorsMessage] of Object.entries(errorResponse.message)) {
                    console.log(error)
                    notifications.show({
                        title: `THere is error at field ${field}`,
                        message: `Details: ${errorsMessage}`,
                        color: 'red',
                        icon: <IconX size={20} stroke={1.5} />,
                        position: 'top-right'
                    })
                  }
            } else {
                notifications.show({
                    title: 'Saving Failed',
                    message: `Error when store new customer data ${error}`,
                    color: 'red',
                    icon: <IconX size={20} stroke={1.5} />,
                    position: 'top-right'
                })
            }
            return error;
        } finally {
            setIsLoadingApproveLeave(false)
        }
    }

    return { approveLeave, isLoadingApproveLeave }
}
export default useApproveLeave;
