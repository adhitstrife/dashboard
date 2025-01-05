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

const useUpdateTarget = () => {
    const [isLoadingUpdateTarget, setIsLoadingUpdateTarget] = useState(false);
    const [targetData, setSalesDate] = useState<salesResponse>();
    
    const updateTarget = async (id: number, payload: targetAddPayload) => {
        try {
            setIsLoadingUpdateTarget(true);
            const url = `/backend/api/sales/target/${id}`;
            const response = await axios.put(url, payload, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: salesResponse = response.data
            setSalesDate(json)

            notifications.show({
                title: 'Saving Complete',
                message: `Success update target sales`,
                color: 'green',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })

        } catch (error) {
            notifications.show({
                title: 'Saving Failed',
                message: `Error when updating sales target ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingUpdateTarget(false)
        }
    }

    return { updateTarget, targetData, isLoadingUpdateTarget }
}
export default useUpdateTarget;