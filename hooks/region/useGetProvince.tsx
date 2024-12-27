import selectData from "@/app/interface/component/selectData";
import countryResponse from "@/app/interface/response/country";
import provincesResponse from "@/app/interface/response/province";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetProvinces = () => {
    const [isLoadingGetProvinces, setIsLoadingGetProvinces] = useState(false);
    const [provinces, setProvinces] = useState<selectData[]>([]);

    const getProvinceList = async (name?: string | null) => {
        try {
            setIsLoadingGetProvinces(true);
            const url = '/backend/api/provinces';
            const response = await axios.get(`${url}?keyword=${name ? name : ''}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: provincesResponse = response.data
            toString
            setProvinces(json.results.map((province) => ({
                value: province.id.toString(),
                label: province.name
            })))

        } catch (error) {
            notifications.show({
                title: 'Fetch failed',
                message: `Error when fetching cities ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        }
    }

    return { getProvinceList, provinces, isLoadingGetProvinces }
}
export default useGetProvinces;
