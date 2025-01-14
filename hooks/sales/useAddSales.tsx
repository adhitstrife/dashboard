import selectData from "@/app/interface/component/selectData";
import salesPayload from "@/app/interface/payload/salesPayload";
import countryResponse from "@/app/interface/response/country";
import ErrorResponse from "@/app/interface/response/error/error";
import salesResponse from "@/app/interface/response/sales/salesListResponse";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useAddSales = () => {
    const [isLoadingAddSales, setIsLoadingAddSales] = useState(false);
    const [salesData, setSalesDate] = useState<salesResponse>();
    
    const postNewSales = async (payload: salesPayload) => {
        try {
            setIsLoadingAddSales(true);
            const url = '/backend/api/sales';
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
                message: `Success adding new sales`,
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
            setIsLoadingAddSales(false)
        }
    }

    return { postNewSales, salesData, isLoadingAddSales }
}
export default useAddSales;
