import selectData from "@/app/interface/component/selectData";
import countryResponse from "@/app/interface/response/country";
import districtsResponse from "@/app/interface/response/district";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetDistrict = () => {
    const [isLoadingGetDistrict, setIsLoadingGetDistrict] = useState(false);
    const [districts, setDistricts] = useState<selectData[]>([]);

    const getDistrictList = async (name?: string | null, city_id?: number | null) => {
        try {
            setIsLoadingGetDistrict(true);
            const url = '/backend/api/districts';
            const response = await axios.get(`${url}?city_id=${city_id ? city_id : ''}&keyword=${name ? name : ''}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: districtsResponse = response.data
            toString
            setDistricts(json.results.map((district) => ({
                value: district.id.toString(),
                label: district.name
            })))

        } catch (error) {
            notifications.show({
                title: 'Fetch failed',
                message: `Error when fetching districts ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        }
    }

    return { getDistrictList, districts, isLoadingGetDistrict }
}
export default useGetDistrict;
