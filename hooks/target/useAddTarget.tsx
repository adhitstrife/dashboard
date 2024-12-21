import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import targetAddPayload from "@/app/interface/payload/targetAddPayload";
import countryResponse from "@/app/interface/response/country";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useAddTarget = () => {
    const [isLoadingAddTarget, setIsLoadingAddTarget] = useState(false);
    const [targetData, setSalesDate] = useState<salesResponse>();
    
    const postNewTarget = async (payload: targetAddPayload) => {
        try {
            setIsLoadingAddTarget(true);
            const url = '/backend/api/sales/target';
            const response = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: salesResponse = response.data
            setSalesDate(json)

            notifications.show({
                title: 'Saving Complete',
                message: `Success assign new target to sales`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })

        } catch (error) {
            notifications.show({
                title: 'Saving Failed',
                message: `Error when assign new target to sales ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingAddTarget(false)
        }
    }

    return { postNewTarget, targetData, isLoadingAddTarget }
}
export default useAddTarget;
