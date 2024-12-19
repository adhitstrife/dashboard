import selectData from "@/app/interface/component/selectData";
import countryResponse from "@/app/interface/response/country";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetCities = () => {
    const [isLoadingGetCities, setIsLoadingGetCities] = useState(false);
    const [cities, setCities] = useState<selectData[]>([]);

    const getCountryList = async (name?: string | null) => {
        try {
            setIsLoadingGetCities(true);
            const url = '/backend/api/cities';
            const response = await axios.get(`${url}?name=${name ? name : ''}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: countryResponse = response.data
            toString
            setCities(json.results.map((country) => ({
                value: country.id.toString(),
                label: country.name
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

    return { getCountryList, cities, isLoadingGetCities }
}
export default useGetCities;
